import { useState } from "react";
import styles from "./AuthenticationPageSection.module.scss";
import ModalComponent from "../../components/modal/ModalComponent";
import RegisterFormComponent from "./components/register-form/RegisterFormComponent";
import LoginFormComponent from "./components/login-form/LoginFormComponent";

const AuthenticationPageSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className={styles.authentication_section}>
      <h2>Welcome to Chat application</h2>
      <div className={styles.authentication_section__login}>
        <LoginFormComponent openModal={() => setIsModalOpen(true)} />
      </div>
      <ModalComponent
        type={"big"}
        isOpen={isModalOpen}
        closeDialog={() => setIsModalOpen(false)}
      >
        <RegisterFormComponent />
      </ModalComponent>
    </section>
  );
};

export default AuthenticationPageSection;
