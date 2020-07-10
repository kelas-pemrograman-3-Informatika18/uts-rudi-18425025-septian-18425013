
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    // meta: {
    //   authAdmin: false
    // },
    children: [
      { path: '', name: 'dataDVD', component: () => import('pages/admin/datadvd.vue') },
      { path: 'input', name: 'inputBarang', component: () => import('pages/admin/inputbarang.vue') },
      { path: 'formedit/:id', name: 'formedit', component: () => import('pages/admin/formedit.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/userlayout.vue'),
    // meta: {
    //   authUser: false
    // },
    children: [
      { path: '', name: 'homeUser', component: () => import('pages/user/index.vue') },
      { path: 'about', name: 'about', component: () => import('pages/user/about.vue') }
    ]
  },
  {
    path: '/login',
    name: 'loginpage',
    component: () => import('pages/guest/login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
