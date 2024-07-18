import DialogComponent from "../dialog/DialogComponent";
import styles from "./ModalComponent.module.scss";

interface ModalComponentProps {
  type: "small" | "big";
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  closeDialog,
  children,
  type,
}) => {
  const modalVariant = (type: "small" | "big"): string => {
    const modalStyle: { [key in "small" | "big"]: string } = {
      small: styles.small_modal,
      big: styles.big_modal,
    };

    return modalStyle[type];
  };

  return (
    <DialogComponent isOpen={isOpen} closeDialog={closeDialog}>
      <div className={`${styles.modal} ${modalVariant(type)}`}>{children}</div>
    </DialogComponent>
  );
};

export default ModalComponent;
