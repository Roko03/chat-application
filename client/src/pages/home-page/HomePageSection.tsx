import { useEffect, useState } from "react";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import styles from "./HomePageSection.module.scss";
import HomePageUserListComponent from "./components/home-page-user-list/HomePageUserListComponent";
import HomePageChatComponent from "./components/home-page-chat/HomePageChatComponent";
import ChatComponent from "../../components/chat/ChatComponent";
import getAllUsers from "../../lib/user/getAllUsers";
import getConversetion from "../../lib/conversation/getConversation";
import { useSocket } from "../../util/useSocketContext";
import makeConversetion from "../../lib/conversation/makeConversation";

const HomePageSection = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserDB[] | null>(null);
  const [targetUser, setTargetUser] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const { socket } = useSocket();

  const fetchUser = async () => {
    const response = await getAllUsers();

    if (!response.success) {
      setUserList(null);
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

    if (response.conversation.length === 0) {
      const c_data = await makeConversetion(targetUser);
      setConversation(c_data);
      return;
    }

    setConversation(response.conversation[0]);
  };

  const openChat = (id: string) => {
    setIsChatOpen(true);
    setTargetUser(id);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setTargetUser(null);
    setConversation(null);
  };

  const updateMessage = (data: Message) => {
    setConversation((prev) => {
      if (!prev) {
        return {
          _id: "",
          participants: [],
          messages: [data],
        };
      }

      return {
        ...prev,
        messages: [...prev.messages, data],
      };
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      fetchChat();
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (conversation) {
      socket?.on("newMessage", (message) => {
        let messages = [...conversation.messages, message];
        setConversation((prev) => {
          if (!prev) {
            return {
              _id: "",
              participants: [],
              messages: [message],
            };
          }

          return { ...prev, messages };
        });

        return () => socket.off("newMessage");
      });
    }
  }, [conversation, setConversation]);

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
              updateMessage={updateMessage}
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
