export const dynamic = "force-dynamic";
export const revalidate = 10;

import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import styles from "./PostsPage.module.scss";
import Link from "next/link";
import Image from "next/image";

async function GetPosts() {
  const posts = await getDocs(
    query(collection(db, "posts"), orderBy("createdAt", "desc"))
  );

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
            <div className={styles.imageContainer}>
              <Image
                src={post.data().image}
                alt="Post Image"
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.content}>
              <div className={styles.author}>
                <Link href={`/users/${post.data().userId}`}>
                  <Image
                    src={post.data().userImage}
                    alt="Author Profile Image"
                    width={30}
                    height={30}
                  />{" "}
                  <span>{post.data().userName}</span>
                </Link>
              </div>

              <h2 className={styles.postTitle}>{post.data().title}</h2>

              <p className={styles.postContent}>
                {String(post.data().content).length > 50 ? (
                  <>
                    <Link
                      href={`/posts/${post.id}`}
                      className={styles.postLink}
                    >
                      {String(post.data().content).substring(0, 50)}
                      ...
                    </Link>
                  </>
                ) : (
                  post.data().content
                )}
              </p>

              <p>
                <small className={styles.creationDate}>
                  {`
                  ${post
                    .data()
                    .createdAt.toDate()
                    .toLocaleString("en-US", { timeStyle: "short" })}
                    -
                    ${post.data().createdAt.toDate().toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}  
                  `}
                </small>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
