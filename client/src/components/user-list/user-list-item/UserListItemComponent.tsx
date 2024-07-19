import styles from "./UserListItemComponent.module.scss";

interface UserListItemComponentProps {
  type: "primary" | "secondary";
  user: UserDB;
}

const UserListItemComponent: React.FC<UserListItemComponentProps> = ({
  user,
  type,
}) => {
  const listItemVariant = (type: "primary" | "secondary"): string => {
    const listItemStyle: { [key in "primary" | "secondary"]: string } = {
      primary: styles.primary_user_list_item,
      secondary: styles.secondary_user_list_item,
    };

    return listItemStyle[type];
  };

  return (
    <div className={`${styles.user_list_item} ${listItemVariant(type)}`}>
      {user.username}
    </div>
  );
};

export default UserListItemComponent;
