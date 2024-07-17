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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const response = await getUser();

    if (!response.success) {
      return;
    }

    setUser(response.user);
  };

  useEffect(() => {
    if (isAuth) {
      fetchUser();
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={{ isAuth, user, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
