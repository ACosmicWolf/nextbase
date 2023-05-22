import { db } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";

import styles from "./UserPage.module.scss";
import { getServerSession } from "next-auth";
import { authoptions } from "@/lib/NextAuthOptions";
import { revalidatePath } from "next/cache";

interface Props {
  params: {
    slug: string;
  };
}

export default async function UserPage({ params }: Props) {
  const user = await getDoc(doc(db, "users", params.slug));
  const session = await getServerSession(authoptions);

  async function followUnfollow(formData: FormData) {
    "use server";
    const userId: string = formData.get("userId") as string;
    const session = await getServerSession(authoptions);

    if (session?.user.followers?.includes(userId)) {
      await updateDoc(doc(db, "users", session?.user.id), {
        following: arrayRemove(userId),
      }).then(() => console.log("removed"));

      await updateDoc(doc(db, "users", userId), {
        followers: arrayRemove(session?.user.id),
      }).then(() => console.log("removed"));
    } else {
      await updateDoc(doc(db, "users", session?.user.id!), {
        following: arrayUnion(userId),
      });

      await updateDoc(doc(db, "users", userId), {
        followers: arrayUnion(session?.user.id),
      });
    }

    revalidatePath("/users/" + userId);
  }

  return (
    <div className={styles.UserPage}>
      <Image
        src={user.data()?.image}
        alt={user.data()?.name}
        width={100}
        height={100}
      />
      <h1>{user.data()?.name}</h1>
      <p>{user.data()?.email}</p>

      <p>
        Following: {user.data()?.following ? user.data()?.following.length : 0}
      </p>
      <p>
        Followers: {user.data()?.followers ? user.data()?.followers.length : 0}
      </p>

      {session?.user?.id !== user.id && (
        <form action={followUnfollow}>
          <input type="hidden" name="userId" value={user.id} />
          <button className={styles.editButton} type="submit">
            {user.data()?.followers?.includes(session?.user?.id)
              ? "Unfollow"
              : "Follow"}
          </button>
        </form>
      )}
    </div>
  );
}
