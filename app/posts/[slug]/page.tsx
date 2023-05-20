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

  return post;
}

export default async function Post({ params }: Props) {
  const data = await GetPost(params.slug);

  return (
    <div>
      <h1>{data.data()?.title}</h1>
      <p>
        <Image
          src={data.data()?.userImage}
          alt="Author Pfp"
          width={50}
          height={50}
        />
        <small>Created by: {data.data()?.userName}</small>
      </p>
      <p>{data.data()?.content}</p>
      <p>
        <small>
          Created at: {data.data()?.createdAt.toDate().toLocaleString()}
        </small>
      </p>
    </div>
  );
}
