import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home"
import NotFound from "@/views/NotFound";
import About from "@/views/About";
import Catalogo from "@/views/Catalogo";
import Producto from "@/views/Producto";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: Catalogo
    },
    {
      path: '/producto',
      name: 'producto',
      component: Producto
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

export default router
