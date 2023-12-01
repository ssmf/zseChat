<script setup>



</script>

<template>
<div class="sendMessageContainer">
    <input type="text" placeholder="Napisz wiadomosc..." class="enterMessageInput">
    <button class="joinNickedButton">✔</button>
</div>
</template>

<style scoped>

.sendMessageContainer {
    width: 100%;
    display: flex;
    gap: 10px;
    background-color: var(--primaryColor);
    border-radius: 15px;
    padding: 10px;
}

.enterMessageInput {
    width: 100%;
    align-self: stretch;
    background-color: rgba(240, 248, 255, 0);
    border: none;
}

.enterMessageInput:focus {
    outline: none;
}

.joinNickedButton {
  padding: 10px 20px;
  transition: .1s all;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid var(--green);
  align-self: center;
}

.joinNickedButton:hover {
  background-color: var(--green);
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--green);
}

</style>