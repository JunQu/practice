export default {
  test: {
    globals: true,
    deps: {
      registerNodeLoader: false,
    },
    exclude: ['**/node_modules/**', '**/src/**', 'apps/promise/**'],
  },
}
