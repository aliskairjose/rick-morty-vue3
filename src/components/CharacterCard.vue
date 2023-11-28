<template>
  <div class="flex flex-row w-[600px] rounded-xl bg-[#3c3e44]">
    <img
      :src="character.image"
      :alt="character.name"
      srcset=""
      class="h-52 rounded-l-xl"
    />
    <div class="flex flex-col justify-between p-2">
      <div class="font-semibold">
        <h1 class="text-3xl hover:text-yellow-600">
          {{ character.name }}
        </h1>
        <div class="flex">
          <div
            class="p-[5px] rounded-full my-auto mr-2 dot"
          ></div>
          <span>{{ character.status }} - {{ character.species }}</span>
        </div>
      </div>
      <div>
        <p class="text-gray-500 font-semibold">Last known location:</p>
        <p class="hover:text-yellow-600">{{ character.location.name }}</p>
      </div>
      <div>
        <p class="text-gray-500 font-semibold">Origin:</p>
        <p class="hover:text-yellow-600">{{ character.origin.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  const data = defineProps(["character"]);
  const color = ref('')

  onMounted(()=>{
    data.character.status==='Alive' && (color.value = 'green')
    data.character.status==='Dead' && (color.value = 'red')
    data.character.status==='unknown' && (color.value = 'gray')
  })
  
</script>

<style lang="css" scoped>
  .dot{
    background-color: v-bind(color);
  }
</style>
