import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        env: {
          browser: true,
        },
        rules: {
            semi: ['error', 'always'],
            indent: ["error", 2],
            "no-unused-vars": "warn"
        }
    }
];