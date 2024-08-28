import auth from "../middleware/auth";
import home from "../views/member/Home.vue"
import loby from "./loby";
import reward from "./reward";

export default [
    {
        path: '/member',
        component: () => import('../views/member/index.vue'),
        meta: {
            middleware: auth
        },
        children: [
            {
                path: ':pathMatch(.*)*',
                name: 'Member.404',
                component: () => import("../views/404.vue"),
                meta: {
                    title: "ไม่พบข้อมูล",
                },
            },
            {
                path: "",
                name: 'Member.home',
                component: home,
                meta: {
                    title: "หน้าหลัก",

                },
            },
            {
                path: "setting",
                name: 'Member.setting',
                component: () => import('../views/member/Setting.vue'),
                meta: {
                    title: "ตั้งค่า",

                },
            },
            {
                path: "deposit",
                name: 'Member.dedposit',
                component: () => import('../views/member/Deposit.vue'),
                meta: {
                    title: "เติมเงิน",

                },
            },
            {
                path: "withdraw",
                name: 'Member.withdraw',
                component: () => import('../views/member/Withdraw.vue'),
                meta: {
                    title: "ถอนเงิน",

                },
            },
            {
                path: "invite",
                name: 'Member.invite',
                component: () => import('../views/member/Invite.vue'),
                meta: {
                    title: "แนะนำเพื่อน",

                },
            },
            {
                path: "invite-mlm",
                name: 'Member.inviteMLM',
                component: () => import('../views/member/Invite_mlmView.vue'),
                meta: {
                    title: "แนะนำเพื่อน",

                },
            },
            {
                path: "history",
                name: 'Member.history',
                component: () => import('../views/member/History.vue'),
                meta: {
                    title: "ประวัติ",

                },
            },
            {
                path: "bonus",
                name: 'Member.bonus',
                component: () => import('../views/member/Bonus.vue'),
                meta: {
                    title: "รับโบนัส",

                },
            },
            {
                path: "promotion",
                name: 'Member.promotion',
                component: () => import('../views/member/Promotion.vue'),
                meta: {
                    title: "รับโบนัส",

                },
            },
            {
                path: "top10",
                name: 'Member.top10',
                component: () => import('../views/member/top10.vue'),
                meta: {
                    title: "TOP 10 ",

                },
            },
            ...reward,
            ...loby
        ],


    },
    {
        path: "/member/select",
        component: () => import('../views/member/Select.vue'),
        meta: {
            title: "เลือกค่ายเกม",

        },
    }
]