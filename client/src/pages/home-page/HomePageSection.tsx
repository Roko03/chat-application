import { useEffect, useState } from "react";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import styles from "./HomePageSection.module.scss";
import HomePageUserListComponent from "./components/home-page-user-list/HomePageUserListComponent";
import HomePageChatComponent from "./components/home-page-chat/HomePageChatComponent";
import ChatComponent from "../../components/chat/ChatComponent";
import getAllUsers from "../../lib/user/getAllUsers";
import getConversetion from "../../lib/conversation/getConversation";

const HomePageSection = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserDB[] | null>(null);
  const [targetUser, setTargetUser] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);

  const fetchUser = async () => {
    const response = await getAllUsers();

    if (!response.success) {
      return;
    }
    setUserList(response.user);
  };

  const fetchChat = async () => {
    if (!targetUser) {
      setConversation(null);
      return;
    }

    const response = await getConversetion(targetUser);

    setConversation(response.conversation[0]);
  };

  const openChat = (id: string) => {
    setIsChatOpen(true);
    setTargetUser(id);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setTargetUser(null);
  };

  useEffect(() => {
    fetchChat();
  }, [isChatOpen]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className={styles.home_section}>
      <div className={styles.home_section__container}>
        <SidebarComponent
          userList={userList}
          openChat={(id: string) => openChat(id)}
        />
        {isChatOpen && conversation && (
          <HomePageChatComponent closeChat={() => closeChat()}>
            <ChatComponent
              messages={conversation.messages}
              targetUser={targetUser}
            />
          </HomePageChatComponent>
        )}
      </div>
      {!isChatOpen && (
        <HomePageUserListComponent
          userList={userList}
          openChat={(id: string) => openChat(id)}
        />
      )}
    </section>
  );
};

export default HomePageSection;
