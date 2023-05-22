import styles from "./Loading.module.scss";

export default function LoadingComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
}
