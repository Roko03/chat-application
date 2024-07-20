import { ChangeEvent, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import styles from "./ChatComponent.module.scss";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

const ChatComponent = () => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = (message: string) => {
    socket.emit("message", { message });

    setMessage("");
  };
  return (
    <div className={styles.chat}>
      <div className={styles.chat__message}></div>
      <div className={styles.chat__input}>
        <textarea
          value={message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value as string)
          }
          placeholder="Napiši poruku"
          name="message"
          rows={2}
        />
        <ButtonComponent variant={"main"} onClick={() => sendMessage(message)}>
          <p>Pošalji</p>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default ChatComponent;
