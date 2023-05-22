import { getServerSession } from "next-auth";
import styles from "./Profile.module.scss";
import { authoptions } from "@/lib/NextAuthOptions";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

async function GetPosts() {
  const session = await getServerSession(authoptions);
  const req = await getDocs(
    query(
      collection(db, "posts"),
      where("userEmail", "==", session?.user?.email)
    )
  );
  return req.docs;
}

export default async function ProfilePage() {
  const session = await getServerSession(authoptions);
  const posts = await GetPosts();

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.topSection}>
          <Image
            src={session?.user?.image as string}
            alt={session?.user?.name as string}
            width={100}
            height={100}
          />
          <div>
            <p>
              {session?.user?.followers?.length}
              <span>Followers</span>
            </p>
            <p>
              {session?.user?.following?.length}
              <span>Following</span>
            </p>
            <p>
              {posts.length}
              <span>Posts</span>
            </p>
          </div>
        </div>
        <div className={styles.infoSection}>
          <h1>{session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
        </div>
      </div>
      <div className={styles.postsSection}>
        <h1>Posts</h1>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`}
              className={styles.post}
              key={post.id}
            >
              <div className={styles.postImage}>
                {post.data().image && (
                  <Image
                    src={post.data().image}
                    alt={post.data().title}
                    fill
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.postContent}>
                <h1>{post.data().title}</h1>
                <p>{post.data().content}</p>

                <small>
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
