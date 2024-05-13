import NextAuth from 'next-auth';
import { authOptions } from '../../../../server/utils';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
