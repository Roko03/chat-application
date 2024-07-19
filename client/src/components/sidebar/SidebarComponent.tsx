import { useAuth } from "../../util/useAuthContext";
import UserListComponent from "../user-list/UserListComponent";
import styles from "./SidebarComponent.module.scss";

interface SidebarComponentProps {
  userList: UserDB[] | null;
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ userList }) => {
  const auth = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__list}>
          {userList === null || userList.length <= 0 ? (
            <p>Nema korisnika</p>
          ) : (
            <UserListComponent type={"secondary"} userList={userList} />
          )}
        </div>
        {auth && (
          <div className={styles.sidebar__profile}>
            <p>{auth.user?.username}</p>
            <p>{auth.user?.email}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarComponent;
