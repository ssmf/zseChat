<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref, onMounted } from 'vue'

const messageList = ref([])

onMounted(async () => {
    const messageCollection = collection(db, 'Messages')
    const querySnapshot = await getDocs(messageCollection);

    querySnapshot.forEach((doc) => {
    messageList.value.push(doc.data())
    });
    console.log(messageList.value);
})

</script>

<template>
    <div class="chatBox">
        <div class="messageWrapper">
            <message />
            <message v-for="{id, username, messageContent, createdAt} in messages"
            :key="id"
            :username="username"
            :messageContent="messageContent"
            :createdAt="createdAt"
            :nameColor="aaa"
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