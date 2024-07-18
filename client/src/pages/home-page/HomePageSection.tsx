import SidebarComponent from "../../components/sidebar/SidebarComponent";
import styles from "./HomePageSection.module.scss";

const HomePageSection = () => {
  return (
    <section className={styles.home_section}>
      <SidebarComponent />
    </section>
  );
};

export default HomePageSection;
