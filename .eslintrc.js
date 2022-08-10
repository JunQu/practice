module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['leetcode/**/*.ts'],
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    globalThis: false,
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/member-ordering': 'off',
    'max-params': ['error', 6],
  },
}
