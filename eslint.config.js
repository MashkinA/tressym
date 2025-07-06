// eslint.config.ts

import globals from 'globals'
import tseslint from 'typescript-eslint'
import jest from 'eslint-plugin-jest'
import perfectionist from 'eslint-plugin-perfectionist'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import featureSliced from '@conarti/eslint-plugin-feature-sliced'

export default tseslint.config(
    {
      ignores: [
        'dist',
        'generated',
        'scripts',
        'orval.config.ts'
      ]
    },
    {
      name: 'typescript-react',
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          ...globals.browser,
          JSX: 'readonly',
        },
        parser: tseslint.parser,
        parserOptions: {
          project: './tsconfig.json',
        },
      },
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        perfectionist,
        '@conarti/feature-sliced': featureSliced,
      },
      rules: {
        indent: ['error', 'tab', { SwitchCase: 1 }],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single', { avoidEscape: true }],
        'object-curly-spacing': ['error', 'always'],
        semi: ['error', 'always'],
        'react/prop-types': 'off',
        'react/jsx-sort-props': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'jsx-quotes': ['error', 'prefer-single'],
        ...reactHooks.configs.recommended.rules,

        'perfectionist/sort-jsx-props': [
          'error',
          {
            type: 'line-length',
            order: 'asc',
            ignoreCase: true,
            groups: ['unknown', 'shorthand', 'multiline', 'callback'],
            customGroups: {
              callback: '^on.+',
            },
          },
        ],

        'perfectionist/sort-imports': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            ignoreCase: true,
            newlinesBetween: 'never',
            groups: [
              'react',
              'external',
              'type',
              'fsd-app',
              'fsd-pages',
              'fsd-widgets',
              'fsd-features',
              'fsd-entities',
              'fsd-shared',
              'fsd-generated',
              'parent',
              'sibling',
              'style',
            ],
            customGroups: {
              value: {
                react: ['^react$', '^react-.+'],
                'fsd-app': ['app/*'],
                'fsd-pages': ['pages/*'],
                'fsd-widgets': ['widgets/*'],
                'fsd-features': ['features/*'],
                'fsd-entities': ['entities/*'],
                'fsd-shared': ['shared/*'],
                'fsd-generated': ['generated/*'],
              },
              type: {
                react: ['^react$', '^react-.+'],
              },
            },
            environment: 'node',
          },
        ],
      },
    },

    {
      name: 'jest',
      files: ['**/*.spec.*', '**/*.cspec.*'],
      languageOptions: {
        globals: jest.environments.globals.globals,
      },
      plugins: {
        jest,
      },
      rules: {
        ...jest.configs.recommended.rules,
      },
    }
)
