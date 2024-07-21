import { formatDate } from "../../../util/formatDate";
import styles from "./ChatMessageComponent.module.scss";

interface ChatMessageComponentProps {
  user: UserDB | UserWithoutPwd | null;
  variant: "sender" | "recipient";
  message: React.ReactNode;
  date: Date;
}

const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({
  user,
  variant,
  message,
  date,
}) => {
  const messageVariant = (type: "sender" | "recipient"): string => {
    const messageStyle: { [key in "sender" | "recipient"]: string } = {
      sender: styles.sender_message,
      recipient: styles.recipient_message,
    };

    return messageStyle[type];
  };

  if (user === null) {
    return;
  }

  return (
    <div className={`${styles.chat_message} ${messageVariant(variant)}`}>
      <div className={styles.chat_message__user}>{user.username}:</div>
      <div className={styles.chat_message__message}>
        <p>{message}</p>
      </div>
      <span className={styles.chat_message__date}>
        {formatDate(date.toString())}
      </span>
    </div>
  );
};

export default ChatMessageComponent;
