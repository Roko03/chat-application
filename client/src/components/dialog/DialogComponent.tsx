import { useEffect, useRef } from "react";
import styles from "./DialogComponent.module.scss";

interface DialogComponentProps {
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
}

const DialogComponent: React.FC<DialogComponentProps> = ({
  isOpen,
  closeDialog,
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        closeDialog();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isOpen]);

  return (
    <div className={`${styles.dialog} ${isOpen ? styles.dialog_open : ""}`}>
      <div className={styles.dialog__container} ref={dialogRef}>
        {children}
      </div>
    </div>
  );
};

export default DialogComponent;
