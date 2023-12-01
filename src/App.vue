<script setup>

import mainPage from './views/HomeView.vue'
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="mainContainer">
    
    <RouterView />
  </div>
</template>

<style scoped>
.mainContainer {
  width: 100%;
  height: 100%;
  background-image: url('assets/mainBackground.jpg');
  background-size: cover;
}
</style>