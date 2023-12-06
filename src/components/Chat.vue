<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import { db } from '@/firebase'
import { collection, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore'
import { ref, onUnmounted } from 'vue'

const props = defineProps(['currentUserId', 'username']);

const messages = ref([])

const renderMessage = (doc) => {
    const messageDate = doc.data().createdAt.toDate().toLocaleDateString();
    messages.value.push({
        username: doc.data().username,
        messageContent: doc.data().messageContent,
        createdAt: messageDate,
        userId: doc.data().userId,
        nameColor: `hsl(${doc.data().userId / 10}, 100%, 25%)`
    })
}

//Realtime message rerendering
const unsub = onSnapshot(query(collection(db, 'Messages')), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type == 'added') {
            renderMessage(change.doc)
        }
    })
})

onUnmounted(() => {
    unsub()
    if (props.username == 'anon') {
        deleteDoc(doc(db, 'userIds', props.currentUserId.toString()));
    }
})

</script>

<template>
    <div class="chatBox">
        <div class="messageWrapper">
            <message v-for="{username, messageContent, createdAt, userId, nameColor} in messages"
            :key="userId"
            :userId="userId"
            :username="username"
            :messageContent="messageContent"
            :createdAt="createdAt"
            :nameColor="nameColor"
            :currentUserId="currentUserId"
            />
            <div class="scrollAnchor"></div>
        </div>
        <sendMessage class="sendMessageWrapper" :currentUserId="currentUserId" :username="username"/>
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

.messageWrapper {
    padding-right: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    overflow: auto;
    scrollbar-color: var(--gray) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    scroll-padding: 5px;
}

.messageWrapper * {
    overflow-anchor: none;
}

.scrollAnchor {
    padding: 3px;
    margin: -20px 0px -20px 0px;
    overflow-anchor: auto;
    align-self: center;
}
.sendMessageWrapper {
    align-self: center;
}

</style>