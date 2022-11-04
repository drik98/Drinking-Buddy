<script setup lang="ts">
import { ref } from "vue";
import { addMinutes } from "date-fns";
import { Countdown } from "vue3-flip-countdown";

import { useCountdownStore } from "@/stores/countdown";

const countdownStore = useCountdownStore();

function handleElapsed() {
  countdownStore.resetTimer();
  emit("startShuffling");
}

const emit = defineEmits<{
  (e: "startShuffling"): void;
}>();
</script>

<template>
  <div class="d-flex flex-column align-center">
    <Countdown
      :key="countdownStore.deadline"
      :deadlineISO="countdownStore.deadline"
      :showDays="false"
      :showHours="false"
      mainColor="#3b7181"
      @timeElapsed="handleElapsed"
    />
    <div class="d-flex mt-2">
      <v-btn @click="countdownStore.resetTimer" color="primary" class="ma-1">
        <template v-if="countdownStore.isTimerRunning">
          <v-icon start icon="mdi-timer-refresh"></v-icon>
          Reset
        </template>

        <template v-else>
          <v-icon start icon="mdi-timer-play"></v-icon>
          Start
        </template>
        Countdown
      </v-btn>

      <v-btn @click="emit('startShuffling')" class="ma-1">
        <v-icon start icon="mdi-shuffle-variant"></v-icon>
        Shuffle now!
      </v-btn>
    </div>
  </div>
</template>
