<script setup>

import message from './Message.vue';
import sendMessage from './SendMessage.vue';
import supabase from '../supabase';
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps(['currentUserId', 'username']);

const colorGenerator = (userId) => {
    let primaryValue = null
    if (userId > 1000) {
        primaryValue = userId / 100
    }
    else {
        primaryValue = userId / 10
    }
    return `hsl(${primaryValue}, ${Math.min(50 + primaryValue, 100)}%, 25%)`
}   

const messages = ref([])

const renderMessage = (message) => {
    const formattedCreatedAt = new Date(message.createdAt).toLocaleString()
    const nameColor = colorGenerator(message.userId);
    messages.value.push({
        username: message.username,
        messageContent: message.messageContent,
        createdAt: formattedCreatedAt.replace(/[,.]/g, ''),
        userId: message.userId,
        nameColor: nameColor
    })
}
    const { data } = await supabase.from('Messages').select().order('createdAt', { ascending: true })
    const previousMessages = data;

for (const previousMessageIndex in previousMessages) { renderMessage(previousMessages[previousMessageIndex]) }

//Realtime message rerendering
const testMessages = await supabase.channel(props['currentUserId']).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Messages' },
    (payload) => {
        renderMessage(payload.new)
        }
).subscribe()

onUnmounted(async () => {
    await testMessages.unsubscribe()
    if (props.username == 'anon') {
        await supabase.from('userIds').delete().eq('userId', props['currentUserId'])
    }
})

onMounted(() => {
    const messageWrapper = document.getElementById('messageWrapper');
    messageWrapper.scrollTo(1000, 100000)
})

</script>

<template>
    <div class="main">
        <h1 class="header">zsechat - wyraz swoje mysli</h1>
        <div class="chatBox">
            <div class="messageWrapper" id="messageWrapper">
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
    </div>
</template>

<style scoped>

.main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.header {
    font-weight: 600;
    font-size: 40px;
    margin: 0;
    text-align: center;
}
.chatBox {
    height: 80%;
    width: max(80%, 200px);
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