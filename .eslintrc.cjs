module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'semi': ['error', 'always'],
        'indent': ['error', 'tab'],
        "no-unused-vars": ["error", { "args": "after-used", "argsIgnorePattern": "^next$" }],
    },
};
