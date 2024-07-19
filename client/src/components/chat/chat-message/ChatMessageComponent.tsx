import styles from "./ChatMessageComponent.module.scss";

interface ChatMessageComponentProps {
  user: UserDB;
  variant: "sender" | "recipient";
  message: React.ReactNode;
}

const ChatMessageComponent: React.FC<ChatMessageComponentProps> = ({
  user,
  variant,
  message,
}) => {
  const messageVariant = (type: "sender" | "recipient"): string => {
    const messageStyle: { [key in "sender" | "recipient"]: string } = {
      sender: styles.sender_message,
      recipient: styles.recipient_message,
    };

    return messageStyle[type];
  };

  return (
    <div className={`${styles.chat_message} ${messageVariant(variant)}`}>
      <div className={styles.chat_message__user}>{user.username}:</div>
      <div className={styles.chat_message__message}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessageComponent;
