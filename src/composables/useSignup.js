import { ref } from '@vue/reactivity'
import {projectAuth} from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) =>{
    isPending.value = true
    error.value = null

    try{
      const res =  await projectAuth.createUserWithEmailAndPassword(email, password)
      if (!res){
          throw new Error ('could not complete the sign up')
      }

      await res.user.updateProfile({displayName})
      error.value = null
      isPending.value = false
    
      return res
    }
    catch(err){

      console.log(err.message)
      error.value = err.message
      isPending.value = false

    }

}

const useSignup = () =>{

    
    return{error, signup, isPending}
}

export default useSignup