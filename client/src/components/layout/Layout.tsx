import HeaderComponent from "../header/HeaderComponent";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default Layout;
