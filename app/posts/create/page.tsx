"use client";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import styles from "./CreatePostForm.module.scss";
import { useSession } from "next-auth/react";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function CreatePost() {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const content = data.get("content");

    console.log({ title, content });

    const user = await getDocs(
      query(collection(db, "users"), where("email", "==", session?.user?.email))
    ).then((querySnapshot) => {
      return querySnapshot.docs[0];
    });

    const req = await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      userId: user.id,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
    });

    setLoading(false);
    redirect("/posts/" + req.id);
  }

  if (!session)
    return (
      <div>
        <h1>Create Post</h1>
        <p>You must be logged in to create a post.</p>
      </div>
    );

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit} method="POST" className={styles.form}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="post_title"
            name="title"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" required disabled={loading} />
        </div>

        <button type="submit" disabled={loading}>
          Create Post
        </button>
      </form>
    </div>
  );
}
