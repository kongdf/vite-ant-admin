import {
    createRouter,
    createWebHistory
} from "vue-router";
import home from '../views/login.vue'


// 路由信息
const routes = [{
        path: "/",
        name: "Index",
        component: home,
    },
    {
        path: "/layout",
        name: "layout",
        component: () => import('../views/layout.vue'),
        children: [{
                path: '/alvideo',
                name: '视频播放',
                component: () => import('../views/video/alvideo.vue'),
            },
            {
                path: '/echarts',
                name: 'echarts',
                component: () => import('../views/echarts/echarts.vue'),
            },
            {
                path: '/tadiao',
                name: 'tadiao',
                component: () => import('../views/canvas/tadiao.vue'),
            },
            {
                path: '/xeogl',
                name: 'xeogl',
                component: () => import('../views/canvas/xeogl.vue'),
            },
        ],
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;