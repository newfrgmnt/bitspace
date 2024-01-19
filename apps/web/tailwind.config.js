/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                blue: {
                    DEFAULT: '#0062FF',
                    50: '#E5EFFF',
                    100: '#CCE0FF',
                    200: '#99C0FF',
                    300: '#66A1FF',
                    400: '#3381FF',
                    500: '#0062FF',
                    600: '#0054DB',
                    700: '#0047B8',
                    800: '#003994',
                    900: '#002B70',
                    950: '#00245E'
                }
            },
            fontSize: {
                xxs: '.6rem'
            }
        }
    },
    plugins: []
};
