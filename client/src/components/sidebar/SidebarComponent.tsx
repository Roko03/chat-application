import { useAuth } from "../../util/useAuthContext";
import CircularProgressComponent from "../circular-progress/CircularProgressComponent";
import UserListComponent from "../user-list/UserListComponent";
import styles from "./SidebarComponent.module.scss";

interface SidebarComponentProps {
  userList: UserDB[] | null;
  openChat: (id: string) => void;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({
  userList,
  openChat,
}) => {
  const { user } = useAuth();

  return (
    <aside className={styles.sidebar}>
      {!user || !userList ? (
        <CircularProgressComponent />
      ) : (
        <div className={styles.sidebar__container}>
          <div className={styles.sidebar__list}>
            {userList.length <= 0 ? (
              <p>Nema korisnika</p>
            ) : (
              <UserListComponent
                type={"secondary"}
                userList={userList}
                openChat={(id: string) => openChat(id)}
              />
            )}
          </div>
          {user && (
            <div className={styles.sidebar__profile}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default SidebarComponent;
