// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  ...tsjPreset,
  preset: 'react-native',
  setupFiles: ['./jest/setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!@react-navigation/stack|react-native)/'],
  setupFilesAfterEnv: ['jest-enzyme', './jest/setup.ts'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react17',
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    ...tsjPreset.transform,
    '\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  globals: {
    __DEV__: true,
    'ts-jest': {
      babelConfig: true,
      diagnostics: false,
      tsconfig: 'tsconfig.jest.json',
    },
    window: {},
  },
  cacheDirectory: '.jest/cache',
};
