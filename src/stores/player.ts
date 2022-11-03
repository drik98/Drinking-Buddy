import { ref } from "vue";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", () => {
  const players = ref<string[]>(loadPlayers());

  function addPlayer(name: string) {
    if (existsPlayer(name)) {
      return;
    }
    players.value.push(name);
    persistPlayers();
  }

  function removePlayer(name: string) {
    players.value = players.value.filter((playerName) => playerName !== name);
    persistPlayers();
  }

  function existsPlayer(name: string) {
    return players.value.includes(name);
  }

  function persistPlayers() {
    localStorage.setItem("players", JSON.stringify(players.value));
  }

  function loadPlayers() {
    const persistedPlayers = JSON.parse(
      localStorage.getItem("players") || "[]"
    );

    const initalPlayers =
      persistedPlayers?.length > 0
        ? persistedPlayers
        : ["Marie", "Anna H.", "Tom", "Anna P.", "Hendrik", "Anna S.", "Lars"];
    return initalPlayers;
  }

  return { players, addPlayer, removePlayer, existsPlayer };
});
