import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home"
import NotFound from "@/views/NotFound";
import About from "@/views/About";
import Catalogo from "@/views/Catalogo";
import Producto from "@/views/Producto";
import Edit from '../src/views/Edit';
import Add from '../src/views/Add';

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
      path: '/product',
      name: 'product',
      component: Producto
    },
    {
      path: '/edit', 
      name: 'editProduct',
      component: Edit,
  },
  {
      path: '/add', 
      name: 'addProduct',
      component: Add,
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
