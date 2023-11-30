import { createRouter, createWebHistory } from 'vue-router'

import chatSite from '../views/ChatView.vue'
import home from '../views/HomeView.vue'
import App from '../App.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', name: 'default', component: App},
        {path: '/home', name: 'home', component: home},
        {path: '/chat', name: 'chat', component: chatSite}
    ]
});

export default router