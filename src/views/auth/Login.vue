<template>
<form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email">
    <input type="password" placeholder="Password" v-model="password">
    <div class="error" v-if="error">{{error}}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading</button>
</form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '@/composables/useLogin'
import { useRouter } from 'vue-router'
export default {

    setup(){

        const {error, login, isPending} = useLogin()

        const password = ref('')
        const email = ref('')

        const router = useRouter()

        const handleSubmit = async()=>{

            const res = await login(email.value, password.value)
            if(!error.value){
                router.push({name:'UserPlaylists'})
            }
        }

            return{email, password, error, handleSubmit, isPending}
    }
}
</script>

<style>

</style>