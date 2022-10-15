import { configDefaults } from 'vitest/config'

export default {
  test: {
    globals: true,
    deps: {
      registerNodeLoader: false,
    },
    exclude: [...configDefaults.exclude, '**/node_modules/**', '**/src/**', 'apps/promise/**'],
  },
}
