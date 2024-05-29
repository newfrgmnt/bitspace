/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@bitspace/ui'],
    experimental: {
        esmExternals: 'loose'
    }
};
