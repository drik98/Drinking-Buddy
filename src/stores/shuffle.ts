import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Player from "@/types/player";
import { usePlayerStore } from "@/stores/player";

export const useShuffleStore = defineStore("shuffle", () => {
  const shuffleCount = ref(0);

  function shuffle() {
    shuffleCount.value++;
  }

  const shuffledPlayers = computed((): string[] => {
    if (shuffleCount.value < 0) {
      return [];
    }

    const playerStore = usePlayerStore();
    const playerNames: string[] = [...playerStore.playerNames];

    for (let i = playerNames.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);

      const temp = playerNames[i];
      playerNames[i] = playerNames[randomIndex];
      playerNames[randomIndex] = temp;
    }

    return playerNames;
  });

  return { shuffleCount, shuffle, shuffledPlayers };
});
