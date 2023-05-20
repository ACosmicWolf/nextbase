import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import styles from "./PostsPage.module.scss";

async function GetPosts() {
  const posts = await getDocs(collection(db, "posts"));

  return posts;
}

export default async function PostsPage() {
  const posts = await GetPosts();

  return (
    <div>
      <h1>Posts</h1>

      <ul className={styles.postList}>
        {posts.docs.map((post) => (
          <li key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>{post.data().title}</h2>
            <p className={styles.postContent}>
              {String(post.data().content).slice(0, 30)}
            </p>

            <a href={`/posts/${post.id}`} className={styles.postLink}>
              Read more
            </a>

            <p>
              <small className={styles.creationDate}>
                Created at: {post.data().createdAt.toDate().toLocaleString()}
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
