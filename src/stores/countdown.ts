import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { addMinutes } from "date-fns";

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
  limit,
} from "firebase/firestore";
import DB from "@/db";

export const useCountdownStore = defineStore("countdown", () => {
  const deadline = ref(new Date().toISOString());

  const isTimerRunning = computed(() => {
    return new Date(deadline.value) > new Date();
  });

  initializeRealtimeUpdates();

  async function initializeRealtimeUpdates() {
    const q = await query(
      collection(DB, "deadlines"),
      orderBy("date", "desc"),
      limit(1)
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deadline.value = doc.data().date;
      });
      console.log("updated deadline:", deadline.value);
    });
  }

  async function resetTimer() {
    try {
      const docRef = await addDoc(collection(DB, "deadlines"), {
        date: addMinutes(new Date(), 5).toISOString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return { deadline, resetTimer, isTimerRunning };
});
