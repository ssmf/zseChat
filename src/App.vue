<script setup>

import mainPage from './views/HomeView.vue'
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="enterMainContainer">
    
    <RouterView />
  </div>
</template>

<style scoped>

.enterMainContainer {
  width: 100%;
  height: 100%;
  background-image: url('assets/mainBackground.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

</style>