import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "repo,user:email", // Request access to private repositories and email
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.username = profile.login;
        token.name = profile.name;
        token.avatar = profile.avatar_url;
        token.email = profile.email; // Ensure this is set
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.username = token.username;
      session.user.name = token.name;
      session.user.avatar = token.avatar;
      session.user.email = token.email; // Ensure this is included
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


