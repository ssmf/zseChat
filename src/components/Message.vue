<script setup>

</script>

<template>
    <div class="messageContainer">
        <h3 class="nickname" :="username">boilerplateNickname</h3>
        <p class="messageContent" :="messageContent">boilerplate messageContent boilerplate messageContent boilerplate messageContent boilerplate messageContent boilerplate messageContent boilerplate messageContent </p>
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