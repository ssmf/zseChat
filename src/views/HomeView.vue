<script setup>

import supabase  from '../supabase'
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const checkUserId = async (key, value) => {
  const {data, error} = await supabase
  .from('userIds')
  .select()
  .eq(key, value);
  return !data ? false : data;
}

const insertUserId = async(userId, username) => {
  const {data, error} = await supabase
  .from('userIds')
  .insert([{userId, username}])
  .select();
  return !data ? false : data;
}

const deleteUserId = async () => {
  await supabase.from('userIds').delete().eq('userId', currentUserId.value)
}

const router = useRouter()

const currentUserId = ref(null)
const username = ref(null)
const validUsername = ref(false)

//Generate a new, not taken userId
while (currentUserId.value == null) {

  const placeHolder = Math.floor(Math.random() * 10000) + 1

  if (await checkUserId('userId', placeHolder)) {
    insertUserId(placeHolder, 'anon')
    currentUserId.value = placeHolder;
    console.log(currentUserId.value)
    window.addEventListener('unload ', deleteUserId)
  }

}
let currentUserIdDoc = null

const joinAnonymously = async () => {
  router.push(`/chat/${currentUserId.value}/anon${currentUserId.value}`)
}

function validateNickname() {
  console.log('sprawdzam')
  if (username.value == null || username.value.length < 4 || username.value.length > 32) {
    validUsername.value = false;

  }
  else {
    validUsername.value = true;
  }
}

async function joinNicked() {
  if (validUsername.value == true) {
    window.removeEventListener('unload ', deleteUserId)
    console.log('you have joined nicked!')

      if (await checkUserId('username', username.value) == false) {
        await supabase.from('userIds').update({username: username.value}).eq('userId', currentUserId.value).select();
      }
      else {
        deleteUserId();
        const { data } = await supabase.from('userIds').select().eq('username', username.value)
        console.log(data[0].userId)
        currentUserId.value = data[0].userId;
      }

        router.push(`/chat/${currentUserId.value}/${username.value}`)
    }
    else {
      console.log('za krotki nick!')
    }
  }

</script>

<template>
    <div class="enterMainContainer">
      <h1 class="mainHeading">Zse Chat <br> pisz z uczniami zse!</h1>
      <div class="joinContainer">
        <button class="primaryButton joinAnonymouslyButton" @click="joinAnonymously">
        Dolacz anonimowo</button>
        <div class="joinNickedContainer">
          <input type="text" placeholder="username" class="nickInput" v-model="username" @keydown.enter.prevent="joinNicked" @input="validateNickname">
            <button class="primaryButton joinNickedButton" @click="joinNicked">✔</button>
        </div>
        <div v-show="!validUsername" class="errorMessage">Twoj nick musi posiadac 4-32 znakow!</div>
      </div>
    </div>
</template>

<style scoped>

.enterMainContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.mainHeading {
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  margin: 0px 0px 5px 0px;
}

.primaryButton {
  padding: 15px 30px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  font-size: 18px;
  font-weight: 500;
  color: white;
  transition: .1s all;
}
.joinAnonymouslyButton:hover {
  background-color: var(--primaryColor);
  border: 1px solid var(--primaryColor);
  color: white;
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--primaryColor);
}

.joinAnonymouslyButton {
  width: 100%;
}

.joinNickedButton {
  padding: 10px 20px;
  transition: .1s all;
  border-radius: 100%;
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid var(--green);
  height: 100%;
}

.joinNickedButton:hover {
  background-color: var(--green);
  cursor: pointer;
  box-shadow: 0px 0px 10px 0px var(--green);
}

.joinContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.joinNickedContainer {
  display: flex;
  gap: 10px
}

.nickInput {
  font-weight: 300;
  outline: none;
  border: 1px solid white;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 15px;
  padding: 15px 10px 15px 5px;
  transition: .1s all;
  font-size: 18px;
}

.nickInput:active, .nickInput:focus {
  border: 1px solid white;
  box-shadow: 0px 0px 10px -3px white;
}

.errorMessage {
  color: var(--red);
  text-decoration: underline;
}
</style>