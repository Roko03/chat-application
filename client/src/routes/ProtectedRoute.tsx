import { useEffect } from "react";
import { useAuth } from "../util/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/authentication", { replace: true });
    }
  }, [navigate, isAuth]);

  return <Outlet />;
};

export default ProtectedRoute;
