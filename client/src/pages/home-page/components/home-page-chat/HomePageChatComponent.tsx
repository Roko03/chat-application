import { io } from "socket.io-client";
import ButtonComponent from "../../../../components/button/ButtonComponent";
import styles from "./HomePageChatComponent.module.scss";

interface HomePageChatComponentProps {
  closeChat: () => void;
  children: React.ReactNode;
}

const socket = io("http://localhost:3000");

const HomePageChatComponent: React.FC<HomePageChatComponentProps> = ({
  closeChat,
  children,
}) => {
  const leaveChat = () => {
    socket.emit("disconnect");
  };
  return (
    <div className={styles.home_chat_box}>
      <ButtonComponent variant={"secondary"} onClick={closeChat}>
        Izadi iz razgovora
      </ButtonComponent>
      {children}
    </div>
  );
};

export default HomePageChatComponent;
