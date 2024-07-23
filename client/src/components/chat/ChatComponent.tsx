import { ChangeEvent, useState } from "react";
import ButtonComponent from "../button/ButtonComponent";
import styles from "./ChatComponent.module.scss";
import ChatMessageComponent from "./chat-message/ChatMessageComponent";
import { useAuth } from "../../util/useAuthContext";
import makeMessage from "../../lib/conversation/makeMessage";
import CircularProgressComponent from "../circular-progress/CircularProgressComponent";

interface ChatComponentProps {
  messages: Message[];
  targetUser: string | null;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  messages,
  targetUser,
}) => {
  const { isAuth, user } = useAuth();
  const [message, setMessage] = useState<string>("");

  const sendMessage = async (message: string) => {
    if (!targetUser) return;

    if (!message) return;

    await makeMessage(targetUser, message);

    setMessage("");
  };

  return (
    <div className={styles.chat}>
      {!isAuth || !user ? (
        <CircularProgressComponent />
      ) : (
        <>
          <div className={styles.chat__message}>
            {messages !== undefined &&
              messages.length > 0 &&
              messages.map((message) => {
                const isSender = user._id === message.sender_id;
                const variant = isSender ? "sender" : "recipient";

                return (
                  <ChatMessageComponent
                    key={message._id}
                    user={message.sender}
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
            <ButtonComponent
              variant={"main"}
              onClick={() => sendMessage(message)}
            >
              <p>Pošalji</p>
            </ButtonComponent>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatComponent;
