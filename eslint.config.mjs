import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
    ...nextVitals,
    globalIgnores([
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts'
    ]),
    {
        rules: {
            'react/display-name': 'off',
            'react/no-direct-mutation-state': 'off',
            'react/no-render-return-value': 'off',
            'react/no-string-refs': 'off',
            'react/require-render-return': 'off',
        }
    }
]);

export default eslintConfig;
