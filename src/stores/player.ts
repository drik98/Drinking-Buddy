import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Player from "@/types/player";

export const usePlayerStore = defineStore("player", () => {
  const players = ref<Array<Player>>([]);

  const activePlayerNames = computed({
    get: () =>
      players.value.filter(({ isActive }) => isActive).map(({ name }) => name),
    set: (names) => {
      names.forEach(addPlayer);
      players.value.forEach((player) => {
        player.isActive = names.includes(player.name);
      });
    },
  });

  const playerNames = computed(() => players.value.map(({ name }) => name));

  function addPlayer(name: string) {
    if (existsPlayer(name)) {
      return;
    }
    players.value.push({
      name,
      isActive: true,
    });
  }

  function existsPlayer(name: string) {
    return playerNames.value.includes(name);
  }

  return { players, playerNames, activePlayerNames, addPlayer };
});
