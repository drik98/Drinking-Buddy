<template>
  <v-row justify="center">
    <v-combobox
      v-model="playerStore.activePlayerNames"
      :items="playerStore.playerNames"
      label="Players"
      multiple
      chips
      closable-chips
    ></v-combobox>
  </v-row>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();

const savedPlayers = JSON.parse(localStorage.getItem("players") || "[]");
const initalPlayers =
  savedPlayers?.length > 0
    ? savedPlayers
    : ["Marie", "Anna H.", "Tom", "Anna P.", "Hendrik", "Anna S.", "Lars"];

initalPlayers.forEach(playerStore.addPlayer);

watch(
  () => playerStore.activePlayerNames,
  (playerNames) => {
    localStorage.setItem("players", JSON.stringify(playerNames));
  }
);
</script>
