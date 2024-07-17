import { useEffect } from "react";
import { useAuth } from "../util/useAuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      if (auth.isAuth === false) {
        navigate("/authentication", { replace: true });
      }
    }
  }, [navigate, auth]);

  return <Outlet />;
};

export default ProtectedRoute;
