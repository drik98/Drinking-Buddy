<script setup lang="ts">
import { ref } from "vue";

import { useShuffleStore } from "@/stores/shuffle";

const shuffleStore = useShuffleStore();
</script>

<template>
  <v-card variant="outlined">
    <template v-slot:title>Drinking Buddies</template>

    <template v-slot:text>
      <transition-group
        name="shuffleSlow"
        tag="div"
        class="player-container d-flex flex-wrap"
      >
        <div
          v-for="playerName in shuffleStore.shuffledPlayers"
          :key="playerName"
          class="player"
        >
          <v-chip color="primary" label>
            <v-icon start icon="mdi-account-circle-outline"></v-icon>
            {{ playerName }}
          </v-chip>
        </div>
      </transition-group>
    </template>
  </v-card>
</template>

<style scoped>
.shuffleSlow-move {
  transition: transform 2s;
}

.player-container {
  row-gap: 1em;
  column-gap: 0.5em;
  justify-content: center;
}

.player {
  width: 40%;
  display: flex;
  justify-content: flex-end;
}

.player:nth-child(2n) {
  justify-content: flex-start;
}
</style>
