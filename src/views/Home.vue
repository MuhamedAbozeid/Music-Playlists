<template>
  <div class="home">
    <div class="error" v-if="error">could not fetch the data</div>
    <div v-if="documents">
      <ListView :playlists="documents" />
    </div>

  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView'

export default {
  name: 'Home',
  components: {ListView},
  setup(){
    const {documents, error} = getCollection('playlists')
    return {error, documents}
  }
}
</script>
