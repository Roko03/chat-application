import { ChangeEvent, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import styles from "./ChatComponent.module.scss";
import { io } from "socket.io-client";
import ChatMessageComponent from "./chat-message/ChatMessageComponent";
import { useAuth } from "../../util/useAuthContext";
const socket = io("http://localhost:3000");

interface ChatComponentProps {
  messages: Message[];
}

const ChatComponent: React.FC<ChatComponentProps> = ({ messages }) => {
  const auth = useAuth();
  const [message, setMessage] = useState<string>("");

  const sendMessage = (message: string) => {
    // socket.emit("message", { message });

    setMessage("");
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chat__message}>
        {messages.map((message) => {
          const isSender =
            auth?.user?._id.toString() === message.sender_id.toString();
          const user = isSender ? message.sender : message.sender;
          const variant = isSender ? "sender" : "recipient";

          return (
            <ChatMessageComponent
              key={message._id}
              user={user}
              variant={variant}
              message={message.message}
              date={message.createdAt}
            />
          );
        })}
      </div>
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
