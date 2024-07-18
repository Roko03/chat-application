import { Outlet } from "react-router-dom";
import styles from "./ContainerLayout.module.scss";

const ContainerLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default ContainerLayout;
