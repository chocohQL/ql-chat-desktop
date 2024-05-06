import {createRouter, createWebHashHistory} from "vue-router";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

const routes = [
    {path: '/home', name: 'Home', component: Home},
    {path: '/', name: 'Login', component: Login},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
