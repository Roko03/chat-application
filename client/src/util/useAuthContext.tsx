import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../lib/authentication/getUser";

const AuthContext = createContext<{
  isAuth: boolean;
  user: User | null;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth === undefined) {
    throw new Error("useAuth must be use with an provider");
  }

  return auth;
};

export const AuthManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(!user);

  const fetchUser = async () => {
    const response = await getUser();

    if (!response.success) {
      setIsAuth(false);
      setUser(null);
      return;
    }

    setUser(response.user);
    setIsAuth(true);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, user, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
