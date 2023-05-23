"use client";

import { getSession } from "next-auth/react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import styles from "./UserPage.module.scss";

export default async function FollowButton({ slug }: { slug: string }) {
  const { pending } = useFormStatus();
  const session = await getSession();

  return (
    <>
      <input type="hidden" name="currentUserID" value={session?.user.id} />
      <input type="hidden" name="slug" value={slug} />
      <input
        disabled={pending}
        className={pending ? styles.disabled : ""}
        type="submit"
        value={session?.user.following.includes(slug) ? "Unfollow" : "Follow"}
      />
    </>
  );
}
