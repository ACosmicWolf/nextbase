import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      following: string[];
      followers: string[];
    };
  }
  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    following: string[];
    followers: string[];
  }
}
