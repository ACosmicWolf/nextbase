import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

import { firestore } from "@/lib/firebase";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authoptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(firestore),
  secret: process.env.NEXT_PUBLIC_SECRET,
};

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
