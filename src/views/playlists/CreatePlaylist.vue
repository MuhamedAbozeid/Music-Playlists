<template>
<form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input type="text" required placeholder="Playlist title" v-model="title ">
    <textarea required placeholder="playlist description..." v-model="description"></textarea>
    <!-- Upload playlist cover image -->
    <label >Upload playlist cover image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{fileError}}</div>

    <div class="error"></div>
    <button v-if="!isPending">create</button>
    <button v-else disabled>Saving...</button>
</form>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { ref } from '@vue/reactivity'
import {useRouter } from 'vue-router'

export default {
    setup(){

        const {uploadImage, filePath, url} = useStorage()
        const { addDoc, error} = useCollection('playlists')
        const { user } = getUser()

        //useRouter
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)

        const types = ['image/png', 'image/jpeg']
        const  fileError = ref(null)
        
        const isPending = ref(false)

        const handleSubmit = async()=>{

            if(file.value){
                       
                  isPending.value = true

                  await uploadImage(file.value) 
                  const res = await addDoc({

                    title: title.value,
                    description: description.value,
                    userId: user.value.uid,
                    userName: user.value.displayName,
                    coverUrl: url.value,
                    filePath: filePath.value,
                    songs: [],
                    createdAt: timestamp()
                })

                isPending.value = false 
                if(!error.value){
                  router.push({name:'PlaylistDetails', params: {id: res.id } })
                }
               
            }
        }
        const handleChange =(e)=>{
            const selected = e.target.files[0]
            console.log(selected)

            if(selected && types.includes(selected.type)){
                file.value = selected
                fileError.value = null
            }
            else{
                file.value = null
                fileError.value = 'please select an image file (png or jpeg)'
            }
        }

        return{title, description, handleChange,handleSubmit, fileError, isPending}
    }
}
</script>

<style>

  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>