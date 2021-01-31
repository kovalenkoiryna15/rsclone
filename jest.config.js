module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['*.{ts,tsx}'],
  coverageDirectory: './coverage/',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    '\\.(css|scss)$': 'identity-obj-proxy',

    '^Assets\/(.*)$': '<rootDir>/src/assets/$1',
    '^Audio\/(.*)$': '<rootDir>/src/assets/audio/$1',
    '^Components\/(.*)$': '<rootDir>/src/components/$1',
    '^Data\/(.*)$': '<rootDir>/src/assets/data/$1',
    '^Entities\/(.*)$': '<rootDir>/src/entities/$1',
    '^Images\/(.*)$': '<rootDir>/src/assets/images/$1',
    '^Store\/(.*)$': '<rootDir>/src/store/$1',
    '^Styles\/(.*)$': '<rootDir>/src/styles/$1'
  },
  roots: ['<rootDir>/src/', '<rootDir>/test'],
  setupFilesAfterEnv: [
    '<rootDir>/test/setupTests.ts',
    'jest-enzyme'
  ],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  testMatch: ['./**/*.{spec,test}.{ts,tsx,js,jsx}'],
  verbose: true,
};
