import { useAuth } from "../../util/useAuthContext";
import styles from "./SidebarComponent.module.scss";

const SidebarComponent = () => {
  const auth = useAuth();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__list}></div>
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
