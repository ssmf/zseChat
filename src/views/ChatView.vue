<script setup>

import chat from '../components/Chat.vue'
import messageDom from '../components/Message.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentUserId = ref(route.params.currentUserId)
const username = ref(route.params.username)

</script>

<template>
    <div class="chatMainContainer">
        <chat :currentUserId="currentUserId" :username="username"/>
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