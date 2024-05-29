/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@bitspace/ui', '@bitspace/schemas', '@bitspace/nodes'],
    experimental: {
        esmExternals: 'loose'
    }
};
