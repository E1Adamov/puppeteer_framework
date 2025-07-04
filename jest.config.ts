
import { createDefaultPreset } from 'ts-jest';

import  * as constants  from './shared/constants';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: import("jest").Config = {
    testEnvironment: "node",
    preset: 'ts-jest',
    transform: {
        ...tsJestTransformCfg,
    },
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: [
        '<rootDir>/ui/tests/setup.ts',
        '<rootDir>/api/tests/setup.ts',
    ],
    testTimeout: constants.TIMEOUT_60
};

export default config;
