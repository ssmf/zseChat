<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import { useChat } from '../firebase'

const { messages } = useChat()

</script>

<template>
    <div class="chatBox">
        <div class="messageWrapper">
            <message v-for="{id, username, messageContent, createdAt, nameColor} in messages"
            :key="id"
            :username="username"
            :messageContent="messageContent"
            :createdAt="createdAt"
            :nameColor="nameColor"
            />
        </div>
        <sendMessage class="sendMessageWrapper"/>
    </div>
</template>

<style scoped>
.chatBox {
    height: 750px;
    width: 1200px;
    background-color: var(--chatBlue);
    border: 1px solid black;
    padding: 20px 30px;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    gap: 20px;
    box-shadow: 0px 0px 20px 0px var(--chatBlue);
}
.sendMessageWrapper {
    align-self: center;
}

</style>