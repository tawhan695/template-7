export default [
// hack viphackslot
{
    path: "/viphackslot",
    name: "hack.viphackslot",
    component: () => import("@/views/member/components/code_hack/viphack/LoginCode.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  {
    path: "/viphackslot/gamelist",
    name: "hack.viphackslot.hackgamelist",
    component: () => import("@/views/member/components/code_hack/viphack/GameList.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  {
    path: "/viphackslotgames/:vendor",
    name: "hack.viphackslot.hackedgames",
    component: () => import("@/views/member/components/code_hack/viphack/Games.vue"),
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  {
    path: "/viphackgames",
    name: "hack.viphackedgames",
    component: () => import("@/views/member/components/code_hack/viphack/HackGame.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },

  // jackpothack
  {
    path: "/jackpothack",
    name: "hack.hack-javis",
    component: () => import("@/views/member/components/code_hack/hackjackpot/Hack.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  {
    path: "/jackpothack/:vendor/:index/:code",
    name: "hack.hackedjavis",
    component: () => import("@/views/member/components/code_hack/hackjackpot/HackFinish.vue"),
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  {
    path: "/jackpothack/hacked",
    name: "hack.hackjavis",
    component: () => import("@/views/member/components/code_hack/hackjackpot/Hackjakpot.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      title: "1!@#$%^&*()",
    },
  },
  //  end jackpothack

]