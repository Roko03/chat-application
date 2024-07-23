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
  const { socket, setConversationId } = useSocket();

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

    if (
      Object.keys(response.conversation[0].messages[0].recipient).length === 0
    ) {
      setConversation({ ...response.conversation[0], messages: [] });
    } else {
      setConversation(response.conversation[0]);
    }
    setConversationId(response.conversation[0]._id);
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

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      fetchChat();
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (conversation && socket) {
      const handleMessage = (message: Message) => {
        setConversation((prev) => {
          if (!prev) {
            return {
              _id: "",
              participants: [],
              messages: [message],
            };
          }

          return { ...prev, messages: [...prev.messages, message] };
        });
      };

      socket.on("newMessage", handleMessage);

      return () => {
        socket.off("newMessage", handleMessage);
      };
    }
  }, [socket, conversation]);

  //console.log(conversation);

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
