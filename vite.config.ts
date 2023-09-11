import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// import px2rem from 'postcss-px2rem';

// const postcss = px2rem({
//   remUnit: 100
// })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11', "iOS >= 10.3", "safari >= 10", "Android > 39"]
    })
  ],
  server: {
      host: '0.0.0.0',
      port: 8080,
      open: false,
      // force: true,
      // preTransformRequests: true
  },
  define: {
    'process.env': {
      BASE_URL: '/'
    }
  },
  build: {
    assetsDir: 'ossweb-img/',
    target: ['ios11']
  },
  // base: 'https://game.gtimg.cn/images/yxzj/cp/xxx/'
  // css: {
  //   postcss: {
  //     plugins: [postcss]
  //   }
  // },
  // assetsInclude: ['**/*.jpg', './src/**/*.png']
})
