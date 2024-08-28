export default [
    {
        path: "reward",
        name: 'Member.reward',
        component: () => import('../views/member/rewards/index.vue'),
        meta: {
            title: "เกมกิจกรรม",

        },
    },
    {
        path: "reward/spin",
        name: 'Member.spin',
        component: () => import('../views/member/rewards/SpinView.vue'),
        meta: {
            title: "หมุนวงล้อ",

        },
    },
    {
        path: "reward/card",
        name: 'Member.card',
        component: () => import('../views/member/rewards/Card.vue'),
        meta: {
            title: "เปิดการ์ด",

        },
    },
]