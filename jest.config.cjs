module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/test/polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/storybook-static/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!(zustand|@tanstack)/)'],
}
