module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-typescript'],
    ['module:metro-react-native-babel-preset'],
  ],
  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'optional-require'],
    },
  },
};
