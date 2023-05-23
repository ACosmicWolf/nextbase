"use server";

import { db } from "@/lib/firebase";
import {
  updateDoc,
  doc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";

export async function followUnfollow(formData: FormData) {
  const userId: string = formData.get("slug") as string;
  const currentUser = await getDoc(
    doc(db, "users", formData.get("currentUserID") as string)
  );

  if (currentUser.data()?.following?.includes(userId)) {
    await updateDoc(doc(db, "users", currentUser.id), {
      following: arrayRemove(userId),
    });

    await updateDoc(doc(db, "users", userId), {
      followers: arrayRemove(currentUser.id),
    });
  } else {
    await updateDoc(doc(db, "users", currentUser.id), {
      following: arrayUnion(userId),
    });

    await updateDoc(doc(db, "users", userId), {
      followers: arrayUnion(currentUser.id),
    });
  }
  revalidatePath("/users/" + userId);
}
