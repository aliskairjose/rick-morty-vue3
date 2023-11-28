<template>
  <div>
    <h1 class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest mb-16">Episodes</h1>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { episodes } from '../providers/api'

  const data = ref(null)

  onMounted(() => {
    getEpisodes();
  })

  async function getEpisodes() {
    data.value = await episodes()
  }

</script>

<style lang="scss" scoped>

</style>