import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";

import styles from "./Post.module.scss";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

async function GetPost(slug: string) {
  const post = await getDoc(doc(db, "posts", slug));

  return post;
}

export default async function Post({ params }: Props) {
  const data = await GetPost(params.slug);

  return (
    <div>
      <Link href={`/users/${data.data()?.userId}`} className={styles.author}>
        <Image
          src={data.data()?.userImage}
          alt="Author Pfp"
          width={50}
          height={50}
        />
        <small>{data.data()?.userName}</small>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.title}>{data.data()?.title}</h1>

        <div className={styles.imageContainer}>
          {data.data()?.image && (
            <Image
              src={data.data()?.image}
              alt={data.data()?.title}
              fill
              className={styles.image}
            />
          )}
        </div>

        <p>{data.data()?.content}</p>
        <p className={styles.createdAt}>
          {`${data
            .data()
            ?.createdAt.toDate()
            .toLocaleString("en-US", { timeStyle: "short" })}
            -
            ${data.data()?.createdAt.toDate().toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
        </p>
      </div>
    </div>
  );
}
