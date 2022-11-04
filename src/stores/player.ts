import { ref, computed } from "vue";
import { defineStore } from "pinia";

import {
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import DB from "@/db";

import type Player from "@/types/player";

export const usePlayerStore = defineStore("player", () => {
  const players = ref<Player[]>([]);

  initializeRealtimeUpdates();

  const orderNumbers = computed((): number[] => {
    return players.value.map(({ order }) => order);
  });

  async function addPlayer(name: string) {
    if (existsPlayer(name)) {
      return;
    }

    try {
      const docRef = await addDoc(collection(DB, "players"), {
        name,
        order: Math.max(0, ...orderNumbers.value) + 1,
      } as Player);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function removePlayer(player: Player) {
    await deleteDoc(doc(DB, "players", player.id));
  }

  function existsPlayer(name: string) {
    return players.value.some((player) => player.name === name);
  }

  async function initializeRealtimeUpdates() {
    const q = await query(collection(DB, "players"), orderBy("order"));
    onSnapshot(q, (querySnapshot) => {
      const persistedPlayers: Player[] = [];
      querySnapshot.forEach((doc) => {
        persistedPlayers.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("updated players:", persistedPlayers);
      players.value = persistedPlayers;
    });
  }

  async function shuffle() {
    const shuffledOrderNumbers: number[] = orderNumbers.value
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    for (let index = 0; index < players.value.length; index++) {
      const playerRef = doc(DB, "players", players.value[index].id);

      await updateDoc(playerRef, {
        order: shuffledOrderNumbers[index],
      });
    }
  }

  function getRandomDrinkingBuddy(player: Player): Player {
    return [...players.value].filter(
      (otherPlayer) => otherPlayer.name !== player.name
    )[Math.floor(Math.random() * (players.value.length - 2))];
  }

  return {
    players,
    addPlayer,
    removePlayer,
    existsPlayer,
    shuffle,
    getRandomDrinkingBuddy,
  };
});
