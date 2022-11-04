<template>
  <v-container class="fill-height d-flex flex-column justify-space-around">
    <CountdownHandler class="mb-1" @startShuffling="playerStore.shuffle" />
    <PlayerShuffler />
  </v-container>
</template>

<script setup lang="ts">
import CountdownHandler from "@/components/CountdownHandler.vue";
import PlayerShuffler from "@/components/PlayerShuffler.vue";

import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();
</script>
