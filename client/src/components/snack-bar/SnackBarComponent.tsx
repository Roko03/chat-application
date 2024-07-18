import styles from "./SnackBarComponent.module.scss";

interface SnackBarComponentProps {
  closeSnackBar: () => void;
  message: string | null;
  type: "error" | "success" | null;
  isVisible: boolean;
}

const SnackBarComponent: React.FC<SnackBarComponentProps> = ({
  closeSnackBar,
  message,
  type,
  isVisible,
}) => {
  const snackBarClass = (variant: "error" | "success" | null): string => {
    if (variant != null) {
      const snackBarStyle: { [key in "error" | "success"]: string } = {
        error: styles.snack_bar_error,
        success: styles.snack_bar_success,
      };

      return snackBarStyle[variant];
    }

    return "";
  };

  return (
    <div
      className={`${styles.snack_bar} ${snackBarClass(type)} ${
        isVisible ? styles.snack_bar_visible : ""
      }`}
      onClick={closeSnackBar}
    >
      <p>{message}</p>
    </div>
  );
};

export default SnackBarComponent;
