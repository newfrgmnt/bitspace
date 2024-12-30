/** @type {import('next').NextConfig} */
const config = {
    transpilePackages: ['@bitspace/ui', '@bitspace/schemas', '@bitspace/nodes'],
    experimental: {
        esmExternals: 'loose'
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            type: 'asset/source'
        });
        return config;
    }
};

export default config;
