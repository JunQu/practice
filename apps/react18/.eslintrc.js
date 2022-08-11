module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    browser: true,
    jest: true,
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    globalThis: false,
  },
}
