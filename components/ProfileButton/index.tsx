"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./ProfileButton.module.scss";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  name: string;
  image: string;
  email: string;
}

export default function ProfileButton({ name, email, image }: Props) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className={styles.profileButton}
    >
      <Image
        width={50}
        height={50}
        src={image}
        alt={name}
        className={styles.profileImage}
      />

      {open && (
        <div className={styles.dropdown}>
          <Link href={"/profile"} className={styles.profile}>
            <Image width={40} height={40} src={image} alt={name} />
            <div>
              <h1>{name}</h1>
              <p>{email}</p>
            </div>
          </Link>

          <div className={styles.seperator}></div>

          <Link href={"/profile/edit"} className={styles.dropdownItem}>
            <GetIcons name={"edit"} />
            <p>Edit Profile</p>
          </Link>

          <Link href={"/posts/create"} className={styles.dropdownItem}>
            <GetIcons name={"add"} />
            <p>Add Post</p>
          </Link>

          <div className={styles.seperator}></div>

          <button
            onClick={() => {
              signOut();
              router.refresh();
            }}
            className={styles.logoutButton}
          >
            <GetIcons name={"Logout"} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

function GetIcons({ name }: { name: string }) {
  switch (name) {
    case "Logout":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z" />
        </svg>
      );
    case "edit":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
          <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3l1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z" />
        </svg>
      );
    case "add":
      return (
        <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={32}
            d="M256 112v288M400 256H112"
          />
        </svg>
      );
  }

  return <></>;
}
