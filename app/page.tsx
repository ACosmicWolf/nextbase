import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <div>
        <h2 className={styles.posts_title}>Posts</h2>
      </div>
    </main>
  );
}
