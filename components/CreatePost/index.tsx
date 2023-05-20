import styles from "./CreatePostForm.module.scss";
import { redirect } from "next/navigation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getServerSession } from "next-auth";
import { authoptions } from "@/lib/NextAuthOptions";

export default function CreatePostForm() {
  const handleSubmit = async (data: FormData) => {
    "use server";

    const session = await getServerSession(authoptions);

    const payload = {
      title: data.get("title"),
      content: data.get("content"),
    };

    console.log(session?.user?.email);

    const userId = await getDocs(
      query(collection(db, "users"), where("email", "==", session?.user?.email))
    ).then((querySnapshot) => {
      console.log(querySnapshot.docs[0].id);
      return querySnapshot.docs[0].id;
    });

    console.log(userId);
    await addDoc(collection(db, "posts"), {
      title: payload.title,
      content: payload.content,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    redirect("/posts");
  };
  return (
    <form action={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required />
      </div>

      <button type="submit">Create Post</button>
    </form>
  );
}
