import { createContext, useContext, useEffect, useState } from "react";
import getUser from "../lib/authentication/getUser";
import refreshSession from "../lib/authentication/refreshSession";
import SnackBarComponent from "../components/snack-bar/SnackBarComponent";

type SnackBarType = {
  isOpen: boolean;
  message: string | null;
  type: "error" | "success" | null;
};

const AuthContext = createContext<{
  isAuth: boolean;
  user: User | null;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  openSnackBarComponent: (type: "error" | "success", message: string) => void;
  updateSession: () => void;
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
  const [snackBar, setSnackBar] = useState<SnackBarType>({
    isOpen: false,
    message: null,
    type: null,
  });

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

  const updateSession = async () => {
    const response = await refreshSession();

    if (!response.success) {
      setIsAuth(false);
      setUser(null);
      return;
    }

    setIsAuth(true);
    await fetchUser();
  };

  const closeSnackBarComponent = () => {
    setSnackBar((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };

  const openSnackBarComponent = (
    type: "error" | "success",
    message: string
  ) => {
    setSnackBar({
      isOpen: true,
      message: message,
      type: type,
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        setIsAuth,
        setUser,
        openSnackBarComponent,
        updateSession,
      }}
    >
      {children}
      <SnackBarComponent
        type={snackBar.type}
        message={snackBar.message}
        closeSnackBar={() => closeSnackBarComponent()}
        isVisible={snackBar.isOpen}
      />
    </AuthContext.Provider>
  );
};
