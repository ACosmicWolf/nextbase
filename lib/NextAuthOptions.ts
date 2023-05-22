import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

import { NextAuthOptions } from "next-auth";
import { cert } from "firebase-admin/app";
import { initFirestore } from "@next-auth/firebase-adapter";

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
  }),
});

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
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = user.id;
      session.user.following = user.following || [];
      session.user.followers = user.followers || [];
      return session;
    },
  },
};
