"use client";

import Link from "next/link";
import styles from "./NavMenu.module.scss";
import { signIn, useSession } from "next-auth/react";
import ProfileButton from "@/components/ProfileButton";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>
        <Link href="/">
          {/* <Image src={logoImage} alt="NextBase" width={140} /> */}
          NextBase
        </Link>
      </h1>
      <div>
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
          <div className={styles.loading}></div>
        )}
      </div>
    </nav>
  );
}

export function BottomNavMenu() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNavbar}>
      <Link
        href="/posts"
        className={pathname === "/posts" ? styles.selected : ""}
      >
        <IconView />
        <span>View Posts</span>
      </Link>
      <Link
        href="/users"
        className={pathname === "/users" ? styles.selected : ""}
      >
        <IconUsers />
        <span>Users</span>
      </Link>
      <Link className={styles.addPost} href="/posts/create">
        <IconAdd />
      </Link>
      <Link
        href="/profile"
        className={pathname === "/profile" ? styles.selected : ""}
      >
        <IconPerson />
        <span>Profile</span>
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? styles.selected : ""}
      >
        <IconInfo />
        <span>About</span>
      </Link>
    </nav>
  );
}

function IconPerson(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5.875a3.625 3.625 0 00-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 10.95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 10.95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 007.5.875zM4.825 4.5a2.675 2.675 0 115.35 0 2.675 2.675 0 01-5.35 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function IconUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M12.3 12.22A4.92 4.92 0 0014 8.5a5 5 0 00-10 0 4.92 4.92 0 001.7 3.72A8 8 0 001 19.5a1 1 0 002 0 6 6 0 0112 0 1 1 0 002 0 8 8 0 00-4.7-7.28zM9 11.5a3 3 0 113-3 3 3 0 01-3 3zm9.74.32A5 5 0 0015 3.5a1 1 0 000 2 3 3 0 013 3 3 3 0 01-1.5 2.59 1 1 0 00-.5.84 1 1 0 00.45.86l.39.26.13.07a7 7 0 014 6.38 1 1 0 002 0 9 9 0 00-4.23-7.68z" />
    </svg>
  );
}

function IconView(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M.2 10a11 11 0 0119.6 0A11 11 0 01.2 10zm9.8 4a4 4 0 100-8 4 4 0 000 8zm0-2a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  );
}

function IconAdd(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </svg>
  );
}

function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" />
    </svg>
  );
}
