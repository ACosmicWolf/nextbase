"use client";

import Link from "next/link";
import styles from "./NavMenu.module.scss";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import ProfileButton from "@/components/ProfileButton";

import logoImage from "public/logo.png";

export default function NavMenu() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link href="/">
          <Image src={logoImage} alt="NextBase" width={200} />
        </Link>
      </h1>
      <div>
        <ul className={styles.navlinks}>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/users">Users</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
        {status !== "loading" ? (
          status === "authenticated" ? (
            <ProfileButton
              image={session?.user?.image as string}
              name={session?.user?.name as string}
              email={session?.user?.email as string}
            />
          ) : (
            <button
              className={styles.loginButton}
              onClick={() => {
                signIn();
              }}
            >
              Login
            </button>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </nav>
  );
}
