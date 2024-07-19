import { useState } from "react";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import styles from "./HomePageSection.module.scss";
import HomePageUserListComponent from "./components/home-page-user-list/HomePageUserListComponent";
import HomePageChatComponent from "./components/home-page-chat/HomePageChatComponent";
import ChatComponent from "../../components/chat/ChatComponent";

const HomePageSection = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserDB[] | null>([
    {
      _id: "66965eabdd73e802998d7dcc",
      username: "Roko12345",
      email: "roko1@gmail.com",
      password: "$2b$10$886u9Xd.ZJqyN/PSOOj9puZScinFIGt6VmkF7xdenLh/EN5QhgMKW",
    },
    {
      _id: "66965eabdd73e802998d7dcf",
      username: "Roko12345",
      email: "roko1@gmail.com",
      password: "$2b$10$886u9Xd.ZJqyN/PSOOj9puZScinFIGt6VmkF7xdenLh/EN5QhgMKW",
    },
  ]);

  return (
    <section className={styles.home_section}>
      <div className={styles.home_section__container}>
        <SidebarComponent userList={userList} />
        {isChatOpen && (
          <HomePageChatComponent closeChat={() => setIsChatOpen(false)}>
            <ChatComponent />
          </HomePageChatComponent>
        )}
      </div>
      {!isChatOpen && <HomePageUserListComponent userList={userList} />}
    </section>
  );
};

export default HomePageSection;
