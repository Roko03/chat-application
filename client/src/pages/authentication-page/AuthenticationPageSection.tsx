import { useState } from "react";
import styles from "./AuthenticationPageSection.module.scss";
import ModalComponent from "../../components/modal/ModalComponent";

const AuthenticationPageSection = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  return (
    <section className={styles.authentication_section}>
      <h2>Welcome to Chat application</h2>
      <ModalComponent
        type={"small"}
        isOpen={isModalOpen}
        closeDialog={() => setIsModalOpen(false)}
      >
        <h1>Ej</h1>
      </ModalComponent>
    </section>
  );
};

export default AuthenticationPageSection;
