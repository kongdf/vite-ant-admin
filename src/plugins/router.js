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
                // 当 /user/:id/profile 匹配成功 
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                name: '视频播放',
                component: () => import('../views/video/alvideo.vue'),
            },
            {
                path: '/echarts',
                // 当 /user/:id/posts 匹配成功
                // UserPosts 将被渲染到 User 的 <router-view> 内部
                name: 'echarts',
                component: () => import('../views/echarts/echarts.vue'),
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