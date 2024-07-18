import styles from "./ButtonComponent.module.scss";

interface ButtonComponentProps {
  variant: "secondary" | "main";
  onClick: () => void;
  children: React.ReactNode;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  onClick,
  children,
}) => {
  const buttonVariant = (type: "secondary" | "main"): string => {
    const buttonStyle: { [key in "secondary" | "main"]: string } = {
      secondary: styles.button_secondary,
      main: styles.button_main,
    };

    return buttonStyle[type];
  };

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${buttonVariant(variant)}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
