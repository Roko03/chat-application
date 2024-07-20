import UserListComponent from "../../../../components/user-list/UserListComponent";
import styles from "./HomePageUserListComponent.module.scss";

interface HomePageUserListComponentProps {
  userList: UserDB[] | null;
  openChat: (id: string) => void;
}

const HomePageUserListComponent: React.FC<HomePageUserListComponentProps> = ({
  userList,
  openChat,
}) => {
  return (
    <div className={styles.home_user_list}>
      {userList === null || userList.length <= 0 ? (
        <p>Nema korisnika</p>
      ) : (
        <UserListComponent
          userList={userList}
          type={"primary"}
          openChat={(id: string) => openChat(id)}
        />
      )}
    </div>
  );
};

export default HomePageUserListComponent;
