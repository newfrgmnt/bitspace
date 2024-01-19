/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    extensionsToTreatAsEsm: ['.ts'],
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/setup-tests.js']
};
