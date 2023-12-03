<script setup>

defineProps(['username', 'messageContent', 'createdAt', 'userId', 'nameColor']);

</script>

<template>
    <div class="messageContainer">
        <div class="messageTopSection">
            <h3 class="nickname" :style="{color: nameColor}"> {{ username }}</h3>
            <h4 class="createdAtText">{{ createdAt }}</h4>
        </div>
        <p class="messageContent">{{ messageContent }}</p>
    </div>
</template>

<style scoped>

.messageContainer {
    padding: 15px;
    background-color: var(--white);
    border-radius: 0px 15px 15px 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.messageTopSection {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 200px;
    padding: 0px 5px;
}

.createdAtText {
    color: var(--gray);
    margin: 0;
}

.nickname, .messageContent {
    color: black;
    margin: 0;
}

.nickname {
    font-size: 20px;
    font-weight: 500;
}

.messageContent {
    font-size: 15px;
}

</style>