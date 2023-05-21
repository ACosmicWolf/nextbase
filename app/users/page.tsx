export const dynamic = "force-dynamic";
export const revalidate = 10;

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

import styles from "./Users.module.scss";

interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

async function getUsers(): Promise<User[]> {
  const userDocuments = await getDocs(collection(db, "users"));

  const users = userDocuments.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    email: doc.data().email,
    image: doc.data().image,
  }));

  return users;
}

export default async function Users() {
  const users = await getUsers();

  return (
    <div>
      <h1 className={styles.title}>Users</h1>

      <ul className={styles.UserCardContainer}>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              <Image
                src={user.image}
                alt={user.name}
                width={100}
                height={100}
              />
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
