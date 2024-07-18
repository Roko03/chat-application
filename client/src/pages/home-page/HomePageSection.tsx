import HeaderComponent from "../../components/header/HeaderComponent";
import styles from "./HomePageSection.module.scss";

const HomePageSection = () => {
  return (
    <>
      <HeaderComponent />
      <section className={styles.home_section}></section>
    </>
  );
};

export default HomePageSection;
