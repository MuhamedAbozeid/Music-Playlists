<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName">
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{error}}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
</form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

export default {
    setup(){

        const {error, signup, isPending } = useSignup()
        const displayName = ref('')
        const password = ref('')
        const email = ref('')

        const router = useRouter()


        const handleSubmit = async()=>{

            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value){
                router.push({name:'UserPlaylists'})
            }
        }

        return {displayName, password, error, isPending, email, handleSubmit}
    }

}
</script>

<style>

</style>