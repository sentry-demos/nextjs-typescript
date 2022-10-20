module.exports = {
  roots: ['<rootDir>'], // root folder
  globalSetup: '<rootDir>/jest-global.setup.ts',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  moduleNameMapper: {
    // tsconfig paths mapper: Avoids path resolution errors when importing modules
  },
  verbose: true,
};
