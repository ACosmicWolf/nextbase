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
    <button
      onClick={() => {
        setOpen(!open);
      }}
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
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
      <p>{name}</p>

      {open && (
        <div className={styles.dropdown}>
          <Link href={"/profile"} className={styles.dropdownItem}>
            <Image
              width={50}
              height={50}
              src={image}
              alt={name}
              className={styles.profileImage}
            />

            <p>{email}</p>
          </Link>

          <div className={styles.seperator}></div>

          <Link href={"/settings"} className={styles.dropdownItem}>
            <p>Settings</p>
          </Link>

          <div className={styles.logoutButton}>
            <button
              onClick={() => {
                signOut();
                router.refresh();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </button>
  );
}
