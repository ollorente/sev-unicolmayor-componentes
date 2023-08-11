import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
    meta: { isAuthenticated: false }
  },
  // = ADMINISTRATOR ================================================
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('./views/Admin/Dashboard.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/componentes',
    name: 'AdminComponents',
    component: () => import('./views/Admin/Resource/resources.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/componentes/agregar',
    name: 'AdminComponentNew',
    component: () => import('./views/Admin/Resource/resourceNew.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/componentes/:id',
    name: 'AdminComponent',
    component: () => import('./views/Admin/Resource/resource.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/facultades',
    name: 'AdminFaculties',
    component: () => import('./views/Admin/Faculty/faculties.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/facultades/agregar',
    name: 'AdminFacultyNew',
    component: () => import('./views/Admin/Faculty/facultyNew.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/facultades/:id',
    name: 'AdminFaculty',
    component: () => import('./views/Admin/Faculty/faculty.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/programas',
    name: 'AdminPrograms',
    component: () => import('./views/Admin/Program/programs.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/programas/agregar',
    name: 'AdminProgramNew',
    component: () => import('./views/Admin/Program/programNew.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/admin/programas/:id',
    name: 'AdminProgram',
    component: () => import('./views/Admin/Program/program.vue'),
    meta: { isAuthenticated: true }
  },
  // = CLIENT =======================================================
  {
    path: '/componentes',
    name: 'Components',
    component: () => import('./views/Resource/resources.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/componentes/agregar',
    name: 'ComponentNew',
    component: () => import('./views/Resource/resourceNew.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/componentes/:id',
    name: 'Component',
    component: () => import('./views/Resource/resource.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/componentes/:id/editar',
    name: 'ComponentEdit',
    component: () => import('./views/Resource/resourceEdit.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/facultades',
    name: 'Faculties',
    component: () => import('./views/Faculty/faculties.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/facultades/:id',
    name: 'Faculty',
    component: () => import('./views/Faculty/faculty.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/programas',
    name: 'Programs',
    component: () => import('./views/Program/programs.vue'),
    meta: { isAuthenticated: true }
  },
  {
    path: '/programas/:id',
    name: 'Program',
    component: () => import('./views/Program/program.vue'),
    meta: { isAuthenticated: true }
  },
  // = GENERAL ======================================================
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('./views/NotFoundComponent.vue'),
    meta: { isAuthenticated: false }
  }
]

const router = createRouter({ history: createWebHistory(), routes })

// @ts-ignore
router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (to.name !== 'Login' && !user) {
      if (to.matched.some(record => record.meta.isAuthenticated)) {
        next({ name: 'Login' })
      } else {
        next()
      }
    } else {
      next()
    }
  })
})

createApp(App).use(router).mount('#app')
