declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SUPABASE_URL: string;
            SUPABASE_ANON_KEY: string;
            SUPABASE_SERVICE_KEY: string;
        }
    }
}

export {};
