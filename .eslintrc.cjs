module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        'src/**/*.ts',
        'src/**/*.tsx'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: module,
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },

  settings: {
    react: {
      version: "detect",
      runtime: "automatic"
    }
  }
}
