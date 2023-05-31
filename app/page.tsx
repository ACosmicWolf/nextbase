import Link from "next/link";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authoptions } from "@/lib/NextAuthOptions";
import {
  collection,
  documentId,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

async function GetPosts() {
  const session = await getServerSession(authoptions);

  const following = session?.user?.following;

  if (!following) {
    const req = await getDocs(query(collection(db, "posts"), limit(5)));
    return req.docs;
  } else {
    const req = await getDocs(query(collection(db, "posts"), limit(5)));
    return req.docs;
  }
}

async function GetUsers() {
  const session = await getServerSession(authoptions);

  const following = session?.user?.following;

  const req = await getDocs(
    query(
      collection(db, "users"),
      limit(5),
      where(documentId(), "in", following)
    )
  );

  return req.docs;
}

export default async function Home() {
  const posts = await GetPosts();
  const users = await GetUsers();

  return (
    <main>
      <div>
        <h2 className={styles.posts_title}>Posts</h2>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <div className={styles.post}>
                {post.data().image && (
                  <Image
                    src={post.data().image}
                    alt={post.data().title}
                    width={200}
                    height={100}
                  />
                )}
                <div className={styles.post_info}>
                  <h3>{post.data().title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className={styles.title}>Followed Users</h2>

        <div className={styles.users}>
          {users.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <div className={styles.user}>
                <Image
                  src={user.data().image}
                  alt={user.data().name}
                  width={100}
                  height={100}
                />
                <div className={styles.user_info}>
                  <h3>{user.data().name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
