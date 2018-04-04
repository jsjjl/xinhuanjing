import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
            path: 'home',
            title: { i18n: 'home' },
            name: 'home_index',
            component: () =>
                import ('@/views/home/home.vue')
        },
        {
            path: 'ownspace',
            title: '个人中心',
            name: 'ownspace_index',
            component: () =>
                import ('@/views/own-space/own-space.vue')
        },
        {
            path: 'order/:order_id',
            title: '详情',
            name: 'order-info',
            component: () =>
                import ('@/views/advanced-router/component/order-info.vue')
        }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/map',
        icon: 'map',
        name: 'map',
        title: '地图展示',
        component: Main,
        children: [
            {
                path: 'map1',
                icon: 'map',
                name: 'map1',
                title: '地图-士明',
                component: resolve => { require(['@/views/map/map1/map1.vue'], resolve); }
            },
            {
                path: 'map2',
                icon: 'map',
                name: 'map2',
                title: '地图-馨靓',
                component: resolve => { require(['@/views/map/map2/map2.vue'], resolve); }
            },
            {
                path: 'map3',
                icon: 'map',
                name: 'map3',
                title: '地图-守利',
                component: resolve => { require(['@/views/map/map3/map3.vue'], resolve); }
            },
            {
                path: 'map4',
                icon: 'map',
                name: 'map4',
                title: '地图-冉然',
                component: resolve => { require(['@/views/map/map4/map4.vue'], resolve); }
            },
            {
                path: 'map51',
                icon: 'map',
                name: 'map5',
                title: '地图-彦宇',
                component: resolve => { require(['@/views/map/map5/map5.vue'], resolve); }
            }
        ]
    },
    {
        path: '/people',
        icon: 'man',
        title: '维护人员实时数据',
        name: 'people',
        component: Main,
        children: [
            { path: 'index', title: '维护人员实时数据', name: 'people_index', component: resolve => { require(['@/views/people/people.vue'], resolve); } }
        ]
    },
    {
        path: '/history',
        icon: 'stats-bars',
        title: '历史数据',
        name: 'history',
        component: Main,
        children: [
            { path: 'index', title: '历史数据', name: 'history_index', component: resolve => { require(['@/views/history/history.vue'], resolve); } }
        ]
    },
    {
        path: '/work',
        icon: 'clipboard',
        title: '处理工单',
        name: 'work',
        component: Main,
        children: [
            { path: 'index', title: '作业列表', name: 'work_index', component: resolve => { require(['@/views/work/work.vue'], resolve); } }
        ]
    },
    {
        path: '/tousu',
        icon: 'clipboard',
        title: '井盖监控',
        name: 'work',
        component: Main,
        children: [
            { path: 'index', title: '井盖监控', name: 'tousu_index', component: resolve => { require(['@/views/tousu/tousu.vue'], resolve); } }
        ]
    },
    {
        path: '/user-list',
        icon: 'clipboard',
        title: '员工信息',
        name: 'work',
        component: Main,
        children: [
            { path: 'index', title: '员工信息', name: 'user-list', component: resolve => { require(['@/views/user-list/user-list.vue'], resolve); } }
        ]
    }
];


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];