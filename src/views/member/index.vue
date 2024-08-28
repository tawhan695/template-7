<script setup>
import NavBar from "./components/NavbarMember.vue";
import NavMobileMember from "./components/NavMobileMember.vue";
// import DailyLoginReward from "./components/Reward/DailyLoginReward.vue";
</script>

<template>
    <NavBar />

    <br />
    <br />
    <br />

    <RouterView />
    <br />
    <br />
    <br />
    <br />
    <br />
    <NavMobileMember />
    <!-- <DailyLoginReward /> -->
</template>