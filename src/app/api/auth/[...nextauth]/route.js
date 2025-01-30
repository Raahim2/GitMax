// src/app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      // Add authorization parameters to request repo access
      authorization: {
        params: {
          scope: "repo", // Request access to private repositories
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // Store access token and user info
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.username = profile.login;
        token.name = profile.name;
        token.avatar = profile.avatar_url;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose access token to client side
      session.accessToken = token.accessToken;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.avatar = token.avatar;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };