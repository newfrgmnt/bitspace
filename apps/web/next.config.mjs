/** @type {import('next').NextConfig} */
const config = {
    transpilePackages: ['@bitspace/ui', '@bitspace/schemas', '@bitspace/nodes'],
    experimental: {
        esmExternals: 'loose'
    }
};

export default config;
