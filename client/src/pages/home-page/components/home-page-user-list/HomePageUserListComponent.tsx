import UserListComponent from "../../../../components/user-list/UserListComponent";
import styles from "./HomePageUserListComponent.module.scss";

interface HomePageUserListComponentProps {
  userList: UserDB[] | null;
}

const HomePageUserListComponent: React.FC<HomePageUserListComponentProps> = ({
  userList,
}) => {
  return (
    <div className={styles.home_user_list}>
      {userList === null || userList.length <= 0 ? (
        <p>Nema korisnika</p>
      ) : (
        <UserListComponent userList={userList} type={"primary"} />
      )}
    </div>
  );
};

export default HomePageUserListComponent;
