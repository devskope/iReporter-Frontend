module.exports = {
  clearMocks: true,
  verbose: false,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    'src/pages/**/*.{js,jsx}',
    'src/reducers/**/*.{js,jsx}',
    'src/actions/**/*.{js,jsx}',
    '!src/index.js',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|otf|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)'],
  testPathIgnorePatterns: [
    '\\\\node_modules\\\\',
    './__tests__/helpers/*',
    '<rootDir>/__tests__/mediaTransform.js',
  ],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/src/index.js',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|png|psd|svg|webp)$':
      '<rootDir>/__tests__/mediaTransform.js',
  },
};
