/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|ngx-socket-io)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.{ts,js}',
    '!src/app/**/*.module.ts',
    '!src/main.ts',
    '!src/environments/**'
  ],
  coverageReporters: ['text', 'lcov']
};
