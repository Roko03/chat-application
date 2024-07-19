import { useNavigate } from "react-router-dom";
import logoutUser from "../../lib/authentication/logoutUser";
import { useAuth } from "../../util/useAuthContext";
import ButtonComponent from "../button/ButtonComponent";
import styles from "./HeaderComponent.module.scss";

const HeaderComponent = () => {
  const auth = useAuth();
  const navigete = useNavigate();

  const logoutFunction = async () => {
    const response = await logoutUser();

    if (!response.success) {
      auth?.openSnackBarComponent("error", response.message);
      return;
    }

    navigete("/authentication");
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <span>Chat app</span>
        </div>
        <ButtonComponent variant={"main"} onClick={logoutFunction}>
          <p>Odjavi se</p>
        </ButtonComponent>
      </div>
    </header>
  );
};

export default HeaderComponent;
