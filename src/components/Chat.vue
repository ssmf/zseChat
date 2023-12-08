<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import supabase from '../supabase';
import { ref, onUnmounted } from 'vue'

const props = defineProps(['currentUserId', 'username']);

const messages = ref([])

const renderMessage = (message) => {
    const formattedCreatedAt = new Date(message.createdAt).toLocaleString()
    messages.value.push({
        username: message.username,
        messageContent: message.messageContent,
        createdAt: formattedCreatedAt.replace(/[,.]/g, ''),
        userId: message.userId,
        nameColor: `hsl(${message.userId / 100}, 100%, 25%)`
    })
}
    const { data, error } = await supabase.from('Messages').select()
    const previousMessages = data;

for (const previousMessageIndex in previousMessages) { renderMessage(previousMessages[previousMessageIndex]) }

//Realtime message rerendering
const testMessages = await supabase.channel(props['currentUserId']).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Messages' },
    (payload) => {
        renderMessage(payload.new)
        console.log(payload.new)
        }
).subscribe()

onUnmounted(async () => {
    await testMessages.unsubscribe()
    if (props.username == 'anon') {
        await supabase.from('userIds').delete().eq('userId', props['currentUserId'])
    }
})

console.log(messages.value)

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
    height: 100%;
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