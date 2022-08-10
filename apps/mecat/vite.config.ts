/** @type {import('vite').UserConfig} */
export default {
  server: {
    port: 12555,
  },
  esbuild: {
    jsxFactory: 'mecat.createElement',
  },
}
