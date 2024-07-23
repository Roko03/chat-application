import styles from "./CircularProgressComponent.module.scss";

const CircularProgressComponent = () => {
  return (
    <div className={styles.circular_progress_box}>
      <svg className={styles.spinner} viewBox="0 0 50 50">
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth={5}
        ></circle>
      </svg>
    </div>
  );
};

export default CircularProgressComponent;
