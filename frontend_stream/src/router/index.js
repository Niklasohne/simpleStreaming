import {createWebHistory, createRouter} from "vue-router";
import videoPlayer from "@/components/Video.vue";
import chatroom from "@/components/ChatRoom.vue";

const routes = [
    {
      path: "/",
      name: "Video",
      component: videoPlayer,
    },
    {
      path: "/chat",
      name: "Chat",
      component: chatroom,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;