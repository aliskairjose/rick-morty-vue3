<template>
  <div>
    <h1 class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest mb-16">Episodes</h1>
    <div class="flex md:flex-row flex-wrap flex-col gap-4">
      <template v-for="item in data?.results" :key="item.id">
       <div class="w-[300px]  p-4 bg-[#3c3e44] rounded-md">
          <h1 class="text-xl text-yellow-600">{{ item.name }} - <span class="text-base text-white">{{ item.episode }}</span> </h1>
          <p>{{ item.air_date }}</p>
          <p>Personajes: <span class="text-yellow-600">{{ item.characters.length }}</span></p>
       </div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { episodeList } from '../providers/api'
  const data = ref(null)

  onMounted(() => {
    getEpisodes();
  })

  async function getEpisodes() {
    data.value = await episodeList()
  }

</script>

<style lang="scss" scoped>

</style>