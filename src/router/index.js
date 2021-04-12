import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    meta: {
      title: '主页',
    },
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('@/home/index.vue'),
      },
      {
        path: '/manage',
        meta: {
          title: '档案管理',
        },

        component: () => import('@/company/basic.vue'),
        redirect: '/manage/basic'
      },
      {
        path: '/manage/basic',
        meta: {
          title: '档案管理',
        },
        component: () => import('@/company/basic.vue')
      },

        {
          path: '/manage/detail',
          meta: {
            title: '具体信息',
          },
          component: () => import('@/company/detail.vue'),
        },


      {
        path: '/add',
        meta: {
          title: '添加档案',
        },
        component: () => import('@/company/AddArchive.vue'),
      },
      {
        path: '/fetch',
        meta: {
          title: '获取档案',
        },
        component: () => import('@/company/FetchArchive.vue'),
      },
      {
        path: '/detail',
        meta: {
          title: '个人信息',
        },
        component: () => import('@/employee/Detail.vue'),
      },
      {
        path: '/archive',
        meta: {
          title: '个人档案',
        },
        component: () => import('@/employee/Archive.vue'),
      },
      {
        path: '/setting',
        meta: {
          title: '授权码管理',
        },
        component: () => import('@/employee/Setting.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
    },
    component: () => import('@/login/index.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册',
    },
    component: () => import('@/register/index.vue'),
  },
  {
    path: '/authorization/:identity',
    name: 'authorization',
    meta: {
      title: '认证',
    },
    component: () => import('@/authorization/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('/src/components/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
//路由导航守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '小微企业跨组织人才管理系统'
  const authorization = window.localStorage.getItem('authorization')
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    //校验非登录页面的登录状态
    if (authorization) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
