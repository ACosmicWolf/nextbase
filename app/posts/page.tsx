import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

import styles from "./PostsPage.module.scss";
import Link from "next/link";
import Image from "next/image";

async function GetPosts() {
  const posts = await getDocs(collection(db, "posts"));

  console.log("posts", posts.size);

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

            <div className={styles.imageContainer}>
              <Image
                src={post.data().image}
                alt="Post Image"
                fill
                className={styles.image}
              />
            </div>

            <p className={styles.postContent}>
              {String(post.data().content).slice(0, 30)}
            </p>

            <Link href={`/posts/${post.id}`} className={styles.postLink}>
              Read more
            </Link>

            <p>
              <small className={styles.creationDate}>
                Created at: {post.data().createdAt.toDate().toLocaleString()}
              </small>
            </p>

            <p>
              <small className={styles.author}>
                Author:{" "}
                <Link href={`/users/${post.data().userId}`}>
                  <Image
                    src={post.data().userImage}
                    alt="Author Profile Image"
                    width={15}
                    height={15}
                  />{" "}
                  {post.data().userName}
                </Link>
              </small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
