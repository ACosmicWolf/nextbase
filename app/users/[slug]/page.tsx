import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

import styles from "./UserPage.module.scss";

interface Props {
  params: {
    slug: string;
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getDoc(doc(db, "users", params.slug));

  const { name, email, image } = user.data()!;

  return (
    <div className={styles.UserPage}>
      <Image src={image} alt={name} width={100} height={100} />
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
}
