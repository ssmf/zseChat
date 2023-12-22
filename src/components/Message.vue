<script setup>
import { ref } from 'vue';


const props = defineProps(['username', 'messageContent', 'createdAt', 'userId', 'nameColor', 'currentUserId']);

const ifCurrentUserMessage = ref(props.userId == props.currentUserId);

</script>

<template>
    <div class="messageContainer" :class="{ yourMessageContainer : ifCurrentUserMessage }">
        <div class="messageTopSection">
            <h3 v-if="ifCurrentUserMessage" class="nickname" :style="{color: nameColor}"> {{ username }} (ty)</h3>
            <h3 v-else class="nickname" :style="{color: nameColor}"> {{ username }}</h3>           
            <h4 class="createdAtText">{{ createdAt }}</h4>
        </div>
        <p class="messageContent">{{ messageContent }}</p>
    </div>
</template>

<style scoped>

.messageContainer {
    max-width: 60%;
    padding: 15px;
    background-color: var(--white);
    border-radius: 0px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.yourMessageContainer {
    border-radius: 15px 0px 15px 15px;
    align-self: flex-end;

}

.messageTopSection {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    overflow: hidden;
}

.createdAtText {
    color: var(--gray);
    margin: 0;
    text-align: center;
    text-overflow: ellipsis;
}

.nickname, .messageContent {
    color: black;
    margin: 0;
    overflow-wrap: break-word;
}

.nickname {
    font-size: 20px;
    font-weight: 500;
    max-width: 50%;
}

.messageContent {
    font-size: 15px;
    word-wrap: break-word;
}

</style>