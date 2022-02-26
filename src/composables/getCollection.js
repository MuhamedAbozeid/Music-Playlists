import { ref } from '@vue/reactivity'
import { projectFirestore} from '../firebase/config'
import { watchEffect } from '@vue/runtime-core'

const getCollection =(collection, query) =>{

    const error = ref(null)
    const documents = ref(null)

    // register the firestore collection reference
    let collectionRef = projectFirestore.collection(collection)
        .orderBy('createdAt')
    
    if(query){
        collectionRef = collectionRef.where(...query)
    }

    const unsub = collectionRef.onSnapshot((snap)=>{
        
        let results =[]
        snap.docs.forEach(doc =>{
            //must wait for the server to create the timestamp & send it back
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        //update values
        documents.value = results
        error.value = null

    }, (err) =>{
        console.log(err.message)
        documents.value = null
        error.value ='could not fetch data'
    })
    
    watchEffect((onInvalidate) => {

        onInvalidate(() => unsub())

    })

    return { documents, error }
}
export default getCollection