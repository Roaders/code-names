import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ['**/dist/'],
    },
    ...compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ),
    {
        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 11,
            sourceType: 'module',
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                    tabWidth: 4,
                    singleQuote: true,
                    printWidth: 120,
                },
            ],
        },
    },
    {
        files: ['**/*.js'],

        rules: {
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
];
