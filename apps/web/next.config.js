/** @type {import('next').NextConfig} */
module.exports = {
    transpilePackages: ['@repo/ui'],
    experimental: {
        esmExternals: 'loose',
        serverComponentsExternalPackages: ['mongoose']
    }
};
