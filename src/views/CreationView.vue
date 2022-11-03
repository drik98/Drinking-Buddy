<script setup lang="ts"></script>

<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1 class="text-h2 font-weight-bold">Hello there!</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://next.vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-plus-circle" size="large" start />

            Start new Game
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="d-flex align-center justify-center">
        <v-col>
          <v-text-field
            full-width
            prepend-icon="mdi-account-plus"
            placeholder="4711"
            label="Join existing Game"
            hint="Enter game id"
            persistent-hint
          >
            <template v-slot:append-inner>
              <v-icon icon="mdi-plus-circle" size="large" start />
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
