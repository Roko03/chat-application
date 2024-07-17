import { useState } from "react";
import styles from "./AuthenticationPageSection.module.scss";
import ModalComponent from "../../components/modal/ModalComponent";
import RegisterFormComponent from "./components/register-form/RegisterFormComponent";

const AuthenticationPageSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <section className={styles.authentication_section}>
      <h2>Welcome to Chat application</h2>
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
