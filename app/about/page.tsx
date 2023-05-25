import Image from "next/image";
import styles from "./AboutPage.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <h1 className={styles.heading}>About</h1>

      <p className={styles.description}>
        This is a social media website built with Next.js and Firebase.
      </p>

      <h2 className={styles.feature_heading}>Features</h2>
      <ul className={styles.feature_list}>
        <li>Authenticate using NextAuth with Firebase adapter</li>
        <li>Edit your profile and follow other users</li>
        <li>View posts from other users</li>
        <li>Add and edit your own posts</li>
        <li>Explore other users&apos; profiles</li>
        <li>Image compression when uploaded!</li>
      </ul>

      <h2 className={styles.tech_heading}>Tech Stack</h2>
      <ul className={styles.tech_list}>
        <li>Next.js</li>
        <li>Firebase</li>
        <li>NextAuth</li>
        <li>SCSS</li>
      </ul>

      <h2 className={styles.source_heading}>Source Code</h2>
      <p className={styles.source_description}>
        The source code for this project is available on{" "}
        <a href="https://github.com/ACosmicWolf/nextbase" target="_blank">
          GitHub
        </a>
        .
      </p>

      <h2 className={styles.author}>Built By</h2>
      <p className={styles.author_description}>
        <a href="https://acosmicwolf.me" target="_blank">
          <Image
            src={"https://avatars.githubusercontent.com/u/95919584"}
            alt={"Author profile picture"}
            width={100}
            height={100}
          />
          ACosmicWolf
        </a>
      </p>
    </div>
  );
}
