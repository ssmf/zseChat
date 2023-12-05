<script setup>

import { db } from '@/firebase'
import { collection, getDocs, deleteDoc,  setDoc, doc, getDoc, query, where } from 'firebase/firestore';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const currentUserId = ref(null)
const username = ref(null)

const deleteId = () => {
      deleteDoc(doc(db, 'userIds', currentUserId.value.toString()));
    }

//Generate a new, not taken userId
while (currentUserId.value == null) {

  let idIsTaken = false;
  const placeHolder = Math.floor(Math.random() * 1000) + 1

  const currentUserIds = await getDocs(collection(db, 'userIds'))

  currentUserIds.forEach(doc => {
    if (doc.data().id == placeHolder) {idIsTaken = true; return}
  });

  if (idIsTaken == false) {
    currentUserId.value = placeHolder;
    console.log(currentUserId.value);
    await setDoc(doc(db, 'userIds', currentUserId.value.toString()), {
      userId: currentUserId.value
    });
}}

let currentUserIdDoc = null

const joinAnonymously = async () => {
  router.push(`/chat/${currentUserId.value}/anon`)
}
onMounted(() => { 
     window.addEventListener('beforeunload', deleteId)
})

async function joinNicked() {
  console.log('you have joined nicked!')
    window.removeEventListener('beforeunload', deleteId)
    
     const currentUserQuery = query(collection(db, 'userIds'), where('username', '==', username.value.toLowerCase()))
     const querySnapshot = await getDocs(currentUserQuery);
     querySnapshot.forEach((doc) => {
      currentUserIdDoc = doc.data()
     })

     if(currentUserIdDoc) {
      console.log('usunales ID!')
        deleteId()
        currentUserId.value = currentUserIdDoc.userId
        console.log(currentUserId.value);
     }
     else {
      await setDoc(doc(db, 'userIds', currentUserId.value.toString()), {
        userId: currentUserId.value,
        username: username.value
      })}
      router.push(`/chat/${currentUserId.value}/${username.value}`)
  }

</script>

<template>
    <div class="enterMainContainer">
      <h1 class="mainHeading">Zse Chat <br> pisz z uczniami zse!</h1>
      <div class="joinContainer">
        <button class="primaryButton joinAnonymouslyButton" @click="joinAnonymously">
        Dolacz anonimowo</button>
        <div class="joinNickedContainer">
          <input type="text" placeholder="username" class="nickInput" v-model="username">
            <button class="primaryButton joinNickedButton" @click="joinNicked">✔</button>
        </div>
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
  align-items: stretch;
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
</style>