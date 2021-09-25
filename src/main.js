import {
    createApp,
    reactive
} from 'vue'
import App from './App.vue'
import router from './plugins/router'

let app = createApp(App)
let tags = reactive([])
router.beforeEach((to, from, next) => {
    if (!tags.includes(to.name)) {
        tags.push(to.name) 
    }
    app.provide('tags', tags)
    next();
});

app.use(router)
app.mount('#app')