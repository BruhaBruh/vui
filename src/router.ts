import { createRouter, createWebHistory } from 'vue-router';
import { IndexPage, StorybookPage } from './storybook';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'storybook',
      component: StorybookPage,
    },
  ],
});

export default router;
