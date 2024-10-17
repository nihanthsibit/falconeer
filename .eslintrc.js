module.exports = {
    parser: '@typescript-eslint/parser', // Specifies ESLint to use the TypeScript parser
    parserOptions: {
        project: './tsconfig.json', // Tells ESLint to use your project's tsconfig.json
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/explicit-member-accessibility': 'error', // Requires explicit accessibility modifiers on class members
    },
};