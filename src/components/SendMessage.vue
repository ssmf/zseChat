<script setup>

import { ref, watch } from 'vue';

//There is 115 characters per line

const messageContent = ref();
const showError = ref(false);

function validateMessage() {
  const currentText = messageContent.value.textContent
  if (currentText.length >= 300) {
    messageContent.value.textContent = currentText.slice(0, 299);
    showError.value = true; 
      const selectedText = window.getSelection();
      const selectedRange = document.createRange();
      selectedRange.setStart(messageContent.value.childNodes[0], 299);
      selectedRange.collapse(true);
      selectedText.removeAllRanges();
      selectedText.addRange(selectedRange);
      messageContent.value.focus();
  }
  else {
    showError.value = false;
  }
}

function sendMessage() {

}


</script>

<template>
<div class="sendMessageContainer">
    <p v-show="showError" class="errorMessage">Twoja wiadomosc nie moze miec wiecej niz 300 znakow!</p>
    <div class="sendMessageWrapper">
      <div class="enterMessageInput" contenteditable="true" @keydown.enter.prevent="sendMessage" @input="validateMessage" ref="messageContent">Napisz wiadomosc...</div>
      <button class="joinNickedButton">✔</button>
    </div>
</div>
</template>

<style scoped>

.sendMessageContainer {
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    background-color: var(--primaryColor);
    border-radius: 15px;
    padding: 10px;
    max-height: 20%;
}

.errorMessage {
  margin: 0;
  color: var(--red);
  padding: 8px 0px 12px 0px;
  font-size: 18px;
  font-weight: 600;
  text-decoration: underline;
  font-style: italic;
}

.sendMessageWrapper {
  display: flex;
  gap: 10px;
}

.enterMessageInput {
    width: 95%;
    max-height: 100%;
    align-self: stretch;
    background-color: rgba(240, 248, 255, 0);
    border: none;
    overflow-wrap: break-word;
}

.enterMessageInput:focus {
    outline: none;
}

.joinNickedButton {
  padding: 10px;
  transition: .1s all;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid var(--green);
  align-self: center;
  height: 50px;
  width: 50px;
}

.joinNickedButton:hover {
  background-color: var(--green);
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--green);
}

</style>