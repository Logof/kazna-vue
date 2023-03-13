import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/home.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: 'dashboard',
                },
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/dashboard.vue'),
            },
            {
                path: '/kazna/brs/list',
                name: 'brs_list',
                meta: {
                    title: 'Список РР',
                },
                component: () => import(/* webpackChunkName: "brs_list" */ '../views/kazna/brs/list.vue'),
            },
            {
                path: '/kazna/zkr/list',
                name: 'zkr_list',
                meta: {
                    title: 'Список заявок',
                },
                component: () => import(/* webpackChunkName: "brs_list" */ '../views/kazna/zkr/list.vue'),
            },
            {
                path: 'kazna/ado/list',
                name: 'ado_list',
                meta: {
                    title: 'Список заявок',
                },
                component: () => import(/* webpackChunkName: "brs_list" */ '../views/kazna/ado/list.vue'),
            },
            {
                path: 'kazna/abo/list',
                name: 'abo_list',
                meta: {
                    title: 'Список заявок',
                },
                component: () => import(/* webpackChunkName: "brs_list" */ '../views/kazna/abo/list.vue'),
            },
        ],
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    next();
});

export default router;
