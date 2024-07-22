import UserListItemComponent from "./user-list-item/UserListItemComponent";
import styles from "./UserListComponent.module.scss";

interface UserListComponentProps {
  type: "primary" | "secondary";
  userList: UserDB[];
  openChat: (id: string) => void;
}

const UserListComponent: React.FC<UserListComponentProps> = ({
  userList,
  type,
  openChat,
}) => {
  const listVariant = (type: "primary" | "secondary"): string => {
    const listStyle: { [key in "primary" | "secondary"]: string } = {
      primary: styles.primary_user_list,
      secondary: styles.secondary_user_list,
    };

    return listStyle[type];
  };

  return (
    <div className={`${styles.user_list} ${listVariant(type)}`}>
      {userList.map((user) => {
        return (
          <UserListItemComponent
            key={user._id}
            user={user}
            type={type}
            openChat={(id: string) => openChat(id)}
          />
        );
      })}
    </div>
  );
};

export default UserListComponent;
