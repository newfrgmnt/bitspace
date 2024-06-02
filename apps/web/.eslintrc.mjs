/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['@bitspace/eslint-config/next.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true
    }
};
