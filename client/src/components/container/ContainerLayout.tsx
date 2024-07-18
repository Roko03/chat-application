import styles from "./ContainerLayout.module.scss";

const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default ContainerLayout;
