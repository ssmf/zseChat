<script setup>

import mainPage from './views/HomeView.vue'
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="mainContainer">
    <Suspense>
      <RouterView #default/>
      <template #fallback><p style="margin: auto;">LOADING LOL</p></template> <!--LOADING SCREEN TO BE MADE-->
    </Suspense>
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