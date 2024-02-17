import NextAuth, { Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/schema';
if (
  !process.env.GITHUB_AUTH_CLIENT_ID ||
  !process.env.GITHUB_AUTH_CLIENT_SECRETS
) {
  throw new Error('GITHUB_ID and GITHUB_SECRET must be set');
}

export default NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {},
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_AUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRETS,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('signIn', user, account, profile);
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect', url, baseUrl);
      return url;
    },
    async session({ session, user }) {
      console.log('session', session, user);
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log('jwt', token, user, account, profile);
      return token;
    },
  },
});
