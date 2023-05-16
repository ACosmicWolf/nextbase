import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <h1 className={styles.title}>
        Welcome to <Link href="/">NextBase!!!</Link>
      </h1>

      <p className={styles.description}>
        A Social Media Platform built with Next.js and Firebase 🔥
      </p>
    </main>
  );
}
