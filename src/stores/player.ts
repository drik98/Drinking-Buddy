import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Player from "@/types/player";
import { useShuffleStore } from "@/stores/shuffle";

export const usePlayerStore = defineStore("player", () => {
  const shuffleStore = useShuffleStore();

  const players = ref<Player[]>([]);

  const activePlayerNames = computed({
    get: (): string[] =>
      players.value
        .filter(({ isActive }) => isActive)
        .map(({ name }) => name) as string[],
    set: (names: string[]) => {
      names.forEach((name) => addPlayer(name));
      players.value = players.value.map((player: Player) => {
        player.isActive = names.includes(player.name);
        return player;
      });
      shuffleStore.shuffle();
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
