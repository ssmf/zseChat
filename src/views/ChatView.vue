<script setup>

import chat from '../components/Chat.vue'
import messageDom from '../components/Message.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentUserId = ref(route.params.currentUserId)

console.log(currentUserId.value);

</script>

<template>
    <div class="chatMainContainer">
        <chat :userId="currentUserId"/>
    </div>
</template>

<style scoped>
.chatMainContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>