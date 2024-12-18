import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/production',
      name: 'production',
      component: () => import('../views/Production.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: () => import('../views/Inventory.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/equipment',
      name: 'equipment',
      component: () => import('../views/Equipment.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/personnel',
      name: 'personnel',
      component: () => import('../views/Personnel.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查用户是否已登录
  const isAuthenticated = localStorage.getItem('user') !== null

  // 如果路由需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录，允许访问
      next()
    }
  } else if (to.path === '/login' && isAuthenticated) {
    // 如果已登录且试图访问登录页，重定向到首页
    next('/dashboard')
  } else {
    // 其他情况正常放行
    next()
  }
})

export default router
