import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            tseslint.configs.recommended,
        ],
        plugins: {
            import: (await import('eslint-plugin-import')).default,
        },
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'],
            '@typescript-eslint/no-floating-promises': 'error',
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'object',
                        'type',
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                },
            ],
            "object-curly-spacing": ["error", "always", {
                "arraysInObjects": true,
                "objectsInObjects": true,
            }],
        },
        ignores: ['node_modules/', 'temp/', '.idea/'],
    },

    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        extends: [
            tseslint.configs.disableTypeChecked,
        ],
        plugins: {
            import: (await import('eslint-plugin-import')).default,
        },
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'object',
                        'type',
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    'newlines-between': 'always',
                },
            ],
            "object-curly-spacing": ["error", "always", {
                "arraysInObjects": true,
                "objectsInObjects": true,
            }],
        },
        ignores: ['node_modules/', 'temp/', '.idea/'],
    },
);
