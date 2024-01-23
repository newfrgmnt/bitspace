import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

console.log(process.env);

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? ''
        })
    ]
});

export { handler as GET, handler as POST };
