import { createRouter,createWebHistory} from "vue-router";
import home from '../views/login.vue'
// 路由信息
const routes = [
    {
        path: "/",
        name: "Index",
        component: home,
    },
    {
        path: "/layout",
        name: "layout",
        component:  () => import('../views/layout.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router; 