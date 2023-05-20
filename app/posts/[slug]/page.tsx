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

interface Props {
  params: {
    slug: string;
  };
}

async function GetPost(slug: string) {
  const post = await getDoc(doc(db, "posts", slug));
  const user = await getDoc(doc(db, "users", post.data()?.userId));

  return { post, user };
}

export default async function Post({ params }: Props) {
  const data = await GetPost(params.slug);

  return (
    <div>
      <h1>{data.post.data()?.title}</h1>
      <p>
        <Image
          src={data.user.data()?.image}
          alt="Author Pfp"
          width={50}
          height={50}
        />
        <small>Created by: {data.user.data()?.name}</small>
      </p>
      <p>{data.post.data()?.content}</p>
      <p>
        <small>
          Created at: {data.post.data()?.createdAt.toDate().toLocaleString()}
        </small>
      </p>
    </div>
  );
}
