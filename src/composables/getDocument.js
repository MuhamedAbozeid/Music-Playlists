import { ref } from '@vue/reactivity'
import { projectFirestore} from '../firebase/config'
import { watchEffect } from '@vue/runtime-core'

const getDocument =(collection, id)=>{

    const error = ref(null)
    const document = ref(null)

    // register the firestore collection reference
    let documentRef = projectFirestore.collection(collection).doc(id)
        

    const unsub = documentRef.onSnapshot( doc =>{
     
        if(doc.data()){
            document.value = { ...doc.data(), id:doc.id }
            error.value = null

        } else{
            error.value = 'that document does not exist'
        }

    }, (err) =>{
        console.log(err.message)
        error.value ='could not fetch document'
    })
    
    watchEffect((onInvalidate) => {

        onInvalidate(() => unsub())

    })

    return { document, error }
}
export default getDocument