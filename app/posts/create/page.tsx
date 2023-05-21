"use client";

import { addDoc, collection, doc } from "firebase/firestore";
import styles from "./CreatePostForm.module.scss";
import { useSession } from "next-auth/react";
import { db, storage } from "@/lib/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function CreatePost() {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const content = data.get("content");
    const image: File = data.get("image") as File;

    const document = doc(collection(db, "posts"));

    const storageRef = ref(storage, `/postimages/${document.id}`);

    const uploadTask = await uploadBytesResumable(storageRef, image);

    const req = await addDoc(collection(db, "posts"), {
      title: title,
      content: content,
      userId: session?.user.id,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      image: await getDownloadURL(uploadTask.ref),
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
    });

    router.push("/posts/" + req.id);
    setLoading(false);
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

        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          Create Post
        </button>
      </form>
    </div>
  );
}
