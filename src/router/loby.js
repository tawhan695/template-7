import Hotgame from "../views/member/lobby/HotgameView.vue"
import Casino from "../views/member/lobby/CasinoView.vue"
export default [
    {
        path: "lobby",
        name: "Member.Lobby",
        component: () => import("@/views/member/lobby/App.vue"),
        meta: {
            title: "เกมส์ฮอต",
        },
        children: [
            {
                path: "",
                name: "Member.Lobby.Hotgame",
                component: Hotgame,
                // redirect:"/member/lobby/casino"
            },
            {
                path: "casino",
                name: "Member.Lobby.Casino",
                component: Casino,
                meta: {
                    title: "คาสิโน",
                },
            },
            {
                path: "slot",
                name: "Member.Lobby.Slot",
                component: () => import("@/views/member/lobby/slot/SlotView.vue"),
                meta: {
                    title: "เกมส์ล็อต",
                },
            },
            {
                path: "slot/:name",
                name: "Member.Lobby.Slot.games",
                component: () =>
                    import("@/views/member/lobby/slot/SlotGamesView.vue"),
                meta: {
                    title: "เกมส์ล็อต",
                },
            },

            {
                path: "card",
                name: "Member.Lobby.Card",
                component: () => import("@/views/member/lobby/CardView.vue"),
                meta: {
                    title: "เกมไพ่",
                },
            },
            {
                path: "fishing",
                name: "Member.Lobby.Fishing",
                component: () => import("@/views/member/lobby/FishingView.vue"),
                meta: {
                    title: "ยิงปลา",
                },
            },
            {
                path: "sport",
                name: "Member.Lobby.Sport",
                component: () => import("@/views/member/lobby/SportView.vue"),
                meta: {
                    title: "กีฬา",
                },
            },
            {
                path: "esport",
                name: "Member.Lobby.esport",
                component: () => import("@/views/member/lobby/EsportView.vue"),
                meta: {
                    title: "E-SPORT",
                },
            },
            {
                path: "lotto",
                name: "Member.Lobby.Lotto",
                component: () => import("@/views/member/lobby/LottoView.vue"),
                meta: {
                    title: "หวย",
                },
            },
            {
                path: "trading",
                name: "Member.Lobby.Trading",
                component: () => import("@/views/member/lobby/TradingView.vue"),
                meta: {
                    title: "เทรดดิ้ง",
                    requiresAuth: true,
                },
            },
            {
                path: "keno",
                name: "Member.Lobby.Keno",
                component: () => import("@/views/member/lobby/KenoView.vue"),
                meta: {
                    title: "คีโน",
                    requiresAuth: true,
                },
            },
        ],
    },
]