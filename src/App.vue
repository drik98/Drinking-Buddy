<template>
  <v-app>
    <v-main>
      {{ $route.params.uuid }}
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
</script>
