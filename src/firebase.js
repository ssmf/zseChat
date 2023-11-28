import firebase from 'firebase/app'
import 'firebase/firestore'

import {ref, onUnmounted, computed} from 'vue'

firebase.initializeApp({
    apiKey: "AIzaSyDeqWKaBrIEu1olDdiYuCOj-iofmpcLVW4",
    authDomain: "zsechat.firebaseapp.com",
    projectId: "zsechat",
    storageBucket: "zsechat.appspot.com",
    messagingSenderId: "13897562575",
    appId: "1:13897562575:web:a7325a162b0d9d65b0baba"
  });

const fireStore = firebase.firestore();
const messageCollection = fireStore.collection('messages');
const messageQuery = messageCollection.orderBy('createdAt', 'desc').limit(100);

export function useChat() {
    const messages = ref([]);
    const unsubscribe = messageQuery.onSnapshot(snapshot => {
        messages.value = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        })).reverse()
    })

    onUnmounted(unsubscribe)
    
    const sendMessage = text => {
        messageCollection.add({
            username,
            text,
            createdAt: firebase.fireStore.FieldValue.serverTimeStamp()
        })
    }
    
    return {messages, sendMessage}
}