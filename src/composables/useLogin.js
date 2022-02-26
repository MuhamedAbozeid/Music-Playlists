
import { ref } from '@vue/reactivity'
import {projectAuth} from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const login = async(email, password) =>{

    isPending.value = true
    error.value=null
    try{
            const res = await projectAuth.signInWithEmailAndPassword(email, password)
            error.value = null
            isPending.value = false
            return res
    }
    catch(err){
        error.value='incorrect login'
        isPending.value = false
    }
}

const useLogin =()=>{
    return{error, login, isPending}
}
export default useLogin