<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ref, onMounted } from 'vue'

const props = defineProps(['currentUserId']);

const messages = ref([])

onMounted(async () => {
    const messageCollection = collection(db, 'Messages')
    const querySnapshot = await getDocs(messageCollection);

    querySnapshot.forEach((doc) => {
        const messageDate = doc.data().createdAt.toDate().toLocaleDateString();
    messages.value.push({
        username: doc.data().username,
        messageContent: doc.data().messageContent,
        createdAt: messageDate,
        userId: doc.data().userId,
        nameColor: `hsl(${doc.data().userId / 10}, 100%, 25%)`
    })
    });
})

</script>

<template>
    <div class="chatBox">
        <div class="messageWrapper">
            <message v-for="{username, messageContent, createdAt, userId, nameColor} in messages"
            :key="userId"
            :username="username"
            :messageContent="messageContent"
            :createdAt="createdAt"
            :nameColor="nameColor"
            />
        </div>
        <sendMessage class="sendMessageWrapper" :currentUserId="currentUserId"/>
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