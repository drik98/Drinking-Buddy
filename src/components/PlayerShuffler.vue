<script setup lang="ts">
import { ref } from "vue";
import { useShuffleStore } from "@/stores/shuffle";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();
const shuffleStore = useShuffleStore();
const newUserName = ref("");
const snackBarText = ref("");

const isPrisitine = ref(true);

function handleNewUserName() {
  if (
    existsPlayerValidator(newUserName.value) !== true ||
    isValidNameValidator(newUserName.value) !== true
  ) {
    return;
  }
  playerStore.addPlayer(newUserName.value.trim());
  newUserName.value = "";
  isPrisitine.value = true;
}

function existsPlayerValidator(input) {
  if (playerStore.existsPlayer(input.trim())) {
    return "Player with that name already exists.";
  }
  return true;
}

function isValidNameValidator(input) {
  if (!isPrisitine.value && input.trim().length === 0) {
    return "Name must not me empty.";
  }
  return true;
}

function showRandomDrinkBuddy(name) {
  snackBarText.value = `The drinking buddy for ${name} is: ${shuffleStore.getRandomDrinkingBuddy(
    name
  )}`;
}
</script>

<template>
  <v-card variant="outlined">
    <template v-slot:title>Drinking Buddies</template>
    <template v-slot:subtitle
      >Click on a player to get an additional Drinking Buddy!</template
    >

    <v-divider></v-divider>

    <template v-slot:text>
      <transition-group
        name="shuffleSlow"
        tag="div"
        class="player-container d-flex flex-wrap"
      >
        <div
          v-for="(playerName, index) in shuffleStore.shuffledPlayers"
          :key="playerName"
          class="player"
          :class="{
            'player--single':
              index === shuffleStore.shuffledPlayers.length - 1 &&
              shuffleStore.shuffledPlayers.length % 2 !== 0,
          }"
        >
          <v-chip
            color="primary"
            label
            closable
            @click="showRandomDrinkBuddy(playerName)"
            @click:close="playerStore.removePlayer(playerName)"
          >
            <v-icon start icon="mdi-account-circle-outline"></v-icon>
            {{ playerName }}
          </v-chip>
        </div>
      </transition-group>
    </template>

    <v-divider></v-divider>

    <v-card-actions>
      <v-text-field
        v-model="newUserName"
        append-icon="mdi-plus"
        prepend-icon="mdi-account"
        placeholder="John Doe"
        variant="filled"
        clear-icon="mdi-close-circle"
        clearable
        label="Add new Player"
        type="text"
        :rules="[existsPlayerValidator, isValidNameValidator]"
        @click:append="handleNewUserName"
        @update:modelValue="isPrisitine = false"
        @keydown.enter="handleNewUserName"
      ></v-text-field>
    </v-card-actions>
  </v-card>

  <v-snackbar v-if="snackBarText" v-model="snackBarText" :timeout="10000">
    {{ snackBarText }}
  </v-snackbar>
</template>

<style scoped>
.shuffleSlow-move {
  transition: transform 2s;
}

.player-container {
  justify-content: center;
}

.player {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  margin: 0.75em 0.1em;
}

.player:nth-child(2n) {
  justify-content: flex-start;
}

.player--single {
  justify-content: center;
  margin-top: -0.5em;
}
</style>
