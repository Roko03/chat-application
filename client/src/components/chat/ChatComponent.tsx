import ButtonComponent from "../button/ButtonComponent";
import styles from "./ChatComponent.module.scss";

const ChatComponent = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chat__message}></div>
      <div className={styles.chat__input}>
        <textarea placeholder="Napiši poruku" name="message" rows={2} />
        <ButtonComponent variant={"main"} onClick={() => {}}>
          <p>Pošalji</p>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ChatComponent;
