<script setup lang="ts">
import { ref } from "vue";
import { addMinutes } from "date-fns";
import { Countdown } from "vue3-flip-countdown";

const timer = ref(new Date().toISOString());
const isTimerRunning = ref(false);

function resetTimer() {
  isTimerRunning.value = true;
  timer.value = addMinutes(new Date(), 5).toISOString();
}

function handleElapsed() {
  isTimerRunning.value = false;
  emit("startShuffling");
}

const emit = defineEmits<{
  (e: "startShuffling"): void;
}>();
</script>

<template>
  <div class="d-flex flex-column align-center">
    <Countdown
      :key="timer"
      :deadlineISO="timer"
      :showDays="false"
      :showHours="false"
      mainColor="#3b7181"
      @timeElapsed="handleElapsed"
    />
    <div class="d-flex">
      <v-btn @click="resetTimer" color="primary" class="ma-1">
        <template v-if="isTimerRunning">
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
