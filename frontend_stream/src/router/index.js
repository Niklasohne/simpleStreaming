import {createWebHistory, createRouter} from "vue-router";
import Home from "../components/Home"
import Stream from "../components/Stream"

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/stream",
      name: "Stream",
      component: Stream,
      props: (route) => ({ id: route.query.id })  
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;