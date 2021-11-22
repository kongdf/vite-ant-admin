import {
    createApp,
    reactive
} from 'vue'
import App from './App.vue'
import router from './plugins/router'
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'


let app = createApp(App)



// let tags = reactive([])
router.beforeEach((to, from, next) => {
    // if (!tags.includes(to.name)) {
    //     tags.push(to.name) 
    // }
    // app.provide('tags', tags)
    NProgress.start();
    next();

});


router.afterEach(() => {
    NProgress.done()
})
app.use(router)
app.mount('#app')