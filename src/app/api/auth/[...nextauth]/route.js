// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: "Ov23li4CkXgIzpdcIIeg",
      clientSecret: "cabbe50cc1030a7b9d2171cd072f85b6191e83e3",
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Optional: customize the sign-in page
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Store user information in the token
      if (profile) {
        token.username = profile.login; // GitHub username
        token.name = profile.name;       // Full name
        token.avatar = profile.avatar_url; // Profile picture URL
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token properties to session
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.avatar = token.avatar; // Add avatar URL to session
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
