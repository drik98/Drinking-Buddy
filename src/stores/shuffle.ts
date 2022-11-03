import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { usePlayerStore } from "@/stores/player";

export const useShuffleStore = defineStore("shuffle", () => {
  const shuffleCount = ref(0);

  function shuffle() {
    let counter = 0;
    shuffleCount.value++;
    const interval = setInterval(() => {
      shuffleCount.value++;
      if (++counter >= 3) {
        clearTimeout(interval);
      }
    }, 1000);
  }

  const shuffledPlayers = computed((): string[] => {
    if (shuffleCount.value < 0) {
      return [];
    }

    const playerStore = usePlayerStore();
    const playerNames: string[] = [...playerStore.players];

    for (let i = playerNames.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);

      const temp = playerNames[i];
      playerNames[i] = playerNames[randomIndex];
      playerNames[randomIndex] = temp;
    }

    return playerNames;
  });

  function getRandomDrinkingBuddy(name) {
    const playerStore = usePlayerStore();
    const playerNames: string[] = [...playerStore.players].filter(
      (playerName) => playerName !== name
    );

    return playerNames[Math.floor(Math.random() * playerNames.length - 1)];
  }

  return { shuffleCount, shuffle, shuffledPlayers, getRandomDrinkingBuddy };
});
