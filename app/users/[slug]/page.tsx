import { getServerSession } from "next-auth";
import styles from "./UserPage.module.scss";
import { authoptions } from "@/lib/NextAuthOptions";
import Image from "next/image";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import FollowButton from "./FollowButton";
import { followUnfollow } from "./actions";

interface Props {
  params: {
    slug: string;
  };
}

async function GetPosts(slug: any) {
  const user = await getDoc(doc(db, "users", slug));
  const req = await getDocs(
    query(
      collection(db, "posts"),
      where("userEmail", "==", user.data()?.email),
      orderBy("createdAt", "desc")
    )
  );
  return req.docs;
}

export default async function ProfilePage({ params }: Props) {
  const session = await getServerSession(authoptions);
  const user = await getDoc(doc(db, "users", params.slug));
  const posts = await GetPosts(params.slug);

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.topSection}>
          <div>
            <Image
              src={user.data()?.image as string}
              alt={user.data()?.name as string}
              width={100}
              height={100}
            />
            <div>
              <p>
                {user.data()?.followers?.length || 0}
                <span>Followers</span>
              </p>
              <p>
                {user.data()?.following?.length || 0}
                <span>Following</span>
              </p>
              <p>
                {posts.length || 0}
                <span>Posts</span>
              </p>
            </div>
          </div>
          <div className={styles.infoSection}>
            <div>
              <h1>{user.data()?.name}</h1>
              <span className={styles.infoEmail}>{user.data()?.email}</span>
            </div>
            {params.slug !== session?.user?.id && (
              <form action={followUnfollow}>
                {/* @ts-expect-error Server Component */}
                <FollowButton slug={params.slug} />
              </form>
            )}
          </div>
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
