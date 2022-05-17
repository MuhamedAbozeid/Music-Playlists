import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN ,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_MUSIC_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_MUSIC_APP_ID
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {projectFirestore, projectAuth, timestamp, projectStorage}