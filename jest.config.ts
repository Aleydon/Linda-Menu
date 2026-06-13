import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        diagnostics: false,
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          module: 'commonjs',
          moduleResolution: 'node',
          baseUrl: '.',
          paths: {
            '@/*': ['./src/*']
          },
          ignoreDeprecations: '6.0'
        }
      }
    ]
  },
  rootDir: '.',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
};

export default config;
