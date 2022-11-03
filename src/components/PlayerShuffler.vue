<script setup lang="ts">
import { ref } from "vue";
import { useShuffleStore } from "@/stores/shuffle";
import { usePlayerStore } from "@/stores/player";

const playerStore = usePlayerStore();
const shuffleStore = useShuffleStore();
const newUserName = ref("");

function handleNewUserName() {
  if (
    existsPlayerValidator(newUserName.value) !== true ||
    isValidNameValidator(newUserName.value) !== true
  ) {
    return;
  }
  playerStore.addPlayer(newUserName.value.trim());
  newUserName.value = "";
}

function existsPlayerValidator(input) {
  if (playerStore.existsPlayer(input.trim())) {
    return "Player with that name already exists.";
  }
  return true;
}

function isValidNameValidator(input) {
  if (input.trim().length === 0) {
    return "Name must not me empty.";
  }
  return true;
}
</script>

<template>
  <v-card variant="outlined">
    <template v-slot:title>Drinking Buddies</template>

    <template v-slot:text>
      <transition-group
        name="shuffleSlow"
        tag="div"
        class="player-container d-flex flex-wrap"
      >
        <div
          v-for="playerName in shuffleStore.shuffledPlayers"
          :key="playerName"
          class="player"
        >
          <v-chip
            color="primary"
            label
            closable
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
        @keydown.enter="handleNewUserName"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.shuffleSlow-move {
  transition: transform 2s;
}

.player-container {
  row-gap: 1em;
  column-gap: 0.5em;
  justify-content: center;
}

.player {
  width: 40%;
  display: flex;
  justify-content: flex-end;
}

.player:nth-child(2n) {
  justify-content: flex-start;
}
</style>
