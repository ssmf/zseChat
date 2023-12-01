<script setup>

import chat from '../components/Chat.vue'
import messageDom from '../components/Message.vue'

</script>

<template>
    <div class="chatMainContainer">
        <chat />
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