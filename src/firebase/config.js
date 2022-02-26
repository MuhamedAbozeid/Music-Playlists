import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDl_dXBSpHTc98ES0goALlEkPDuezJ6KuY",
    authDomain: "music-playlists-7cfdd.firebaseapp.com",
    projectId: "music-playlists-7cfdd",
    storageBucket: "music-playlists-7cfdd.appspot.com",
    messagingSenderId: "705365499131",
    appId: "1:705365499131:web:4a77d45286fd1fe01de45e"
  };

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export {projectFirestore, projectAuth, timestamp, projectStorage}