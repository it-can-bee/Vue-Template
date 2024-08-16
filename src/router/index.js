import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/static-image',
    children: [{
      path: '/static-image',
      name: 'StaticImage',
      component: () => import('@/views/StaticImage/StaticImage'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/GetHeuristicRulesⅣ_DappTypeLink',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GetHeuristicRulesⅣ_DappTypeLink',
        component: () => import('@/views/GetHeuristicRulesⅣ_DappTypeLink/index'),
        meta: { title: 'getHeuristicRulesⅣ_DappTypeLink', icon: 'form' }
      }
    ]
  },
  {
    path: '/GetHeuristicRulesⅤ_TokenTypeLink',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GetHeuristicRulesⅤ_TokenTypeLink',
        component: () => import('@/views/GetHeuristicRulesⅤ_TokenTypeLink/index'),
        meta: { title: 'getHeuristicRulesⅤ_TokenTypeLink', icon: 'form' }
      }
    ]
  },
  {
    path: '/GetHeuristicRulesⅠ_IndirectTransfer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GetHeuristicRulesⅠ_IndirectTransfer',
        component: () => import('@/views/GetHeuristicRulesⅠ_IndirectTransfer/index'),
        meta: { title: 'getHeuristicRulesⅠ_IndirectTransfer', icon: 'form' }
      }
    ]
  },
  {
    path: '/GetHeuristicRulesⅡ_CrossChainTransfer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GetHeuristicRulesⅡ_CrossChainTransfer',
        component: () => import('@/views/GetHeuristicRulesⅡ_CrossChainTransfer/index'),
        meta: { title: 'getHeuristicRulesⅡ_CrossChainTransfer', icon: 'form' }
      }
    ]
  },
  {
    path: '/GetHeuristicRulesⅢ_ERC20TransferLink',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'GetHeuristicRulesⅢ_ERC20TransferLink',
        component: () => import('@/views/GetHeuristicRulesⅢ_ERC20TransferLink/index'),
        meta: { title: 'getHeuristicRulesⅢ_ERC20TransferLink', icon: 'form' }
      }
    ]
  },
  {
    path: '/query',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Query',
        component: () => import('@/views/query/index'),
        meta: { title: 'query', icon: 'form' }
      }
    ]
  },
  {
    path: '/TornadoCash_Info',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'TornadoCash_Info',
        component: () => import('@/views/TornadoCash_Info/index'),
        meta: { title: 'TornadoCash_Info', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '启发式规则算法', icon: 'tree' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '启发式规则Ⅰ', icon: 'nested' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '启发式规则Ⅱ', icon: 'nested' }
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '启发式规则Ⅲ', icon: 'nested' }
          },
          {
            path: 'menu1-4',
            component: () => import('@/views/nested/menu1/menu1-4'),
            name: 'Menu1-4',
            meta: { title: '启发式规则Ⅳ', icon: 'nested' }
          },
          {
            path: 'menu1-5',
            component: () => import('@/views/nested/menu1/menu1-5'),
            name: 'Menu1-5',
            meta: { title: '启发式规则Ⅴ', icon: 'nested' }
          },
          {
            path: 'menu1-6',
            component: () => import('@/views/nested/menu1/menu1-6'),
            name: 'Menu1-6',
            meta: { title: '启发式规则Ⅵ', icon: 'nested' }
          }
        ]
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
