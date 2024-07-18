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
        error: styles.error_snackbar,
        success: styles.success_snackbar,
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
