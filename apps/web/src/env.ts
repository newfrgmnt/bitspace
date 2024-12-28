import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    client: {
        NEXT_PUBLIC_SUPABASE_URL: z.string(),
        NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
        NEXT_PUBLIC_POSTHOG_HOST: z.string(),
        NEXT_PUBLIC_POSTHOG_API_KEY: z.string()
    },
    server: {
        POLAR_ACCESS_KEY: z.string(),
        OPENAI_API_KEY: z.string(),
        VERCEL_URL: z.string(),
        BLOB_READ_WRITE_TOKEN: z.string(),
        DATABASE_URL: z.string(),
        DIRECT_URL: z.string()
    },
    runtimeEnv: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY:
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        NEXT_PUBLIC_POSTHOG_API_KEY: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        POLAR_ACCESS_KEY: process.env.POLAR_ACCESS_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        VERCEL_URL: process.env.VERCEL_URL,
        BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
        DATABASE_URL: process.env.DATABASE_URL,
        DIRECT_URL: process.env.DIRECT_URL
    }
});
