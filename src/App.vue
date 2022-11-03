<template>
  <v-app>
    <v-app-bar color="teal-darken-4" image="src/assets/navbar-image.jpg">
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <template v-slot:prepend>
        <v-icon icon="mdi-glass-mug-variant" size="large" start />
      </template>

      <v-app-bar-title
        >Maries Birthday Present(s): Drinking Buddy
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>
