<template>
  <v-container class="fill-height d-flex flex-column justify-space-around">
    <UserManagement />
    <CountdownHandler @startShuffling="shuffleStore.shuffle" />
    <PlayerShuffler />
  </v-container>
</template>

<script setup lang="ts">
import UserManagement from "@/components/UserManagement.vue";
import CountdownHandler from "@/components/CountdownHandler.vue";
import PlayerShuffler from "@/components/PlayerShuffler.vue";

import { useShuffleStore } from "@/stores/shuffle";

const shuffleStore = useShuffleStore();
</script>

<style scoped>
.fill-height > * {
  flex-grow: 1;
  padding: 5em 0;
}
</style>
