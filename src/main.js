import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'


  let app = createApp(App)
  
  app.use(router)
  
  app.mount('#app')