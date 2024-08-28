<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid justify-content-end" style="height: 84px">
            <div class="col-auto my-auto">
                <a href="#" @click="Logout()" class="px-1">
                    <h3 class="text-white">
                        <span class="material-icons">logout</span>
                    </h3>
                </a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="card bg-transparent border border-secondary rounded-4">
            <div class="card-body bg-transparency rounded-4">
                <h2 class="text-center">เลือกค่ายเกม</h2>
            </div>
        </div>

        <main class="page-content">
            <div class="cardx">
                <div class="content">
                    <img class="title img-fluid" src="../../assets/logo-min.png">
                    <button class="btnx" @click="setAgent('amb', 1)">เลือกค่าย</button>
                </div>
            </div>
            <div class="cardx">
                <div class="content">
                    <img class="title img-fluid" src="../../assets/logo-ufa.png">
                    <button class="btnx" @click="setAgent('ufa', 2)">เลือกค่าย</button>
                </div>
            </div>

        </main>
    </div>
</template>

<script>
import { useUserStore } from '../../stores/user'
import { useAuthStore } from '../../stores/auth'
export default {
    setup() {
        const userStore = useUserStore();
        const authStore = useAuthStore()

        return {
            userStore,
            authStore
        }

    },
    methods: {
        setAgent(text, num) {
            this.userStore.setSelector(text)
            this.userStore.selector.text = text
            this.userStore.selector.num = num
            this.$router.push("/member");
        },
        Logout(){
            this.authStore.Logout()
            this.$router.push("/");
        }
    },
}
</script>
 
<style lang="scss" scoped>
$imageIds: "/bg/casino.jpg", "/bg/football.jpg";

$bp-md: 600px;
$bp-lg: 800px;

$--d: 700ms;
$--e: cubic-bezier(0.19, 1, 0.22, 1);

.page-content {
    display: grid;
    grid-gap: 1rem;
    padding: 1rem;
    max-width: 1024px;
    margin: 0 auto;

    @media (min-width: $bp-md) {
        grid-template-columns: repeat(2, 1fr);
    }

    // @media (min-width: $bp-lg) {
    //     grid-template-columns: repeat(4, 1fr);
    // }
}



.cardx {
    position: relative;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    padding: 1rem;
    width: 100%;
    text-align: center;
    color: whitesmoke;
    background-color: whitesmoke;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1),
        0 2px 2px rgba(0, 0, 0, 0.1),
        0 4px 4px rgba(0, 0, 0, 0.1),
        0 8px 8px rgba(0, 0, 0, 0.1),
        0 16px 16px rgba(0, 0, 0, 0.1);

    @media (min-width: $bp-md) {
        height: 350px;
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 110%;
        background-size: cover;
        background-position: 0 0;
        transition: transform calc($--d * 1.5) $--e;
        pointer-events: none;
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 200%;
        pointer-events: none;
        background-image: linear-gradient(to bottom,
                hsla(0, 0%, 0%, 0) 0%,
                hsla(0, 0%, 0%, 0.009) 11.7%,
                hsla(0, 0%, 0%, 0.034) 22.1%,
                hsla(0, 0%, 0%, 0.072) 31.2%,
                hsla(0, 0%, 0%, 0.123) 39.4%,
                hsla(0, 0%, 0%, 0.182) 46.6%,
                hsla(0, 0%, 0%, 0.249) 53.1%,
                hsla(0, 0%, 0%, 0.320) 58.9%,
                hsla(0, 0%, 0%, 0.394) 64.3%,
                hsla(0, 0%, 0%, 0.468) 69.3%,
                hsla(0, 0%, 0%, 0.540) 74.1%,
                hsla(0, 0%, 0%, 0.607) 78.8%,
                hsla(0, 0%, 0%, 0.668) 83.6%,
                hsla(0, 0%, 0%, 0.721) 88.7%,
                hsla(0, 0%, 0%, 0.762) 94.1%,
                hsla(0, 0%, 0%, 0.790) 100%);
        transform: translateY(-50%);
        transition: transform calc($--d * 2) $--e;
    }

    @each $id in $imageIds {
        $i: index($imageIds, $id);

        &:nth-child(#{$i}):before {
            background-image: url($id);
        }
    }
}

.content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
    transition: transform $--d $--e;
    z-index: 1;

    >*+* {
        margin-top: 1rem;
    }
}

.title {
    font-size: 1.3rem;
    font-weight: bold;
    line-height: 1.2;
}

.btnx {
    cursor: pointer;
    margin-top: 1.5rem;
    padding: 0.75rem 3.5rem;
    text-transform: uppercase;
    color: white;
    background: linear-gradient(180deg, #fabf3f, #b67c00);
    border: none;
    border-radius: 2rem;

    &:hover {
        background: linear-gradient(180deg, #fabf3f, #d49100);
    }
}

@media (hover: hover) and (min-width: $bp-md) {
    .cardx:after {
        transform: translateY(0);
    }

    .content {
        transform: translateY(calc(100% - 8.5rem));

        >*:not(.title) {
            opacity: 0;
            transform: translateY(1rem);
            transition:
                transform $--d $--e,
                opacity $--d $--e;
        }
    }

    .cardx:hover,
    .cardx:focus-within {
        align-items: center;

        &:before {
            transform: translateY(-4%);
        }

        &:after {
            transform: translateY(-50%);
        }

        .content {
            transform: translateY(0);

            >*:not(.title) {
                opacity: 1;
                transform: translateY(0);
                transition-delay: calc($--d / 8);
            }
        }
    }

    .cardx:focus-within {

        &:before,
        &:after,
        .content,
        .content>*:not(.title) {
            transition-duration: 0s;
        }
    }
}
</style>