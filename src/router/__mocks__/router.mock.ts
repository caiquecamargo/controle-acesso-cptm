import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: {
      template: "<div> HOME </div>"
    },
  },
  {
    path: '/quem-somos',
    name: 'Quem Somos',
    component: {
      template: "<div> Quem Somos </div>"
    },
  },
  {
    path: '/produtos/:type?',
    name: 'Produtos',
    component: {
      template: "<div> Produtos </div>"
    },
    props: true,
  },
  {
    path: '/produto/:id',
    name: 'Produto',
    component: {
      template: "<div> Produto </div>"
    },
    props: true
  },
  {
    path: '/contato',
    name: 'Contato',
    component: {
      template: "<div> Contato </div>"
    },
  },
  {
    path: '/politica-de-privacidade',
    name: 'Privacidade',
    component: {
      template: "<div> Privacidade </div>"
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const windowMock = { ...window };
Object.defineProperty(window, "history", {
  enumerable: true,
  configurable: true,
  get: () => windowMock.history
});

jest.spyOn(window, "history", "get").mockImplementation(() => ({
  ...windowMock.history
}))

Object.defineProperty(window, "location", {
  enumerable: true,
  configurable: true,
  get: () => windowMock.location
});

jest.spyOn(window, "location", "get").mockImplementation(() => ({
  ...windowMock.location
}))

export default router