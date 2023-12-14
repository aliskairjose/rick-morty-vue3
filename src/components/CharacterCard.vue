<template>
  <div
    class="flex flex-row xl:w-[37rem] lg:w-[30rem] w-full rounded-xl bg-[#3c3e44]"
  >
    <img
      :src="character.image"
      :alt="character.name"
      srcset=""
      class="xl:h-52 md:h-44 h-[150px] rounded-l-xl"
    />
    <div
      class="flex flex-col justify-between px-4 py-2 md:text-base text-sm w-full"
    >
      <div class="font-semibold">
        <div class="flex justify-between items-center">
          <h1 class="md:text-3xl text-2xl hover:text-yellow-600">
            {{ character.name }}
          </h1>
          <button
            type="button"
            @click="favoriteHandler"
          >
          <HeartIconSolid class="h-6 w-6 text-yellow-500" v-if="isFavorite" />
            <HeartIconOutline class="h-6 w-6 text-yellow-500" v-else/>
          </button>
        </div>
        <div class="flex">
          <div class="p-[5px] rounded-full my-auto mr-2 dot"></div>
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
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/vue/24/outline";

const data = defineProps(["character", "favorites"]);
const emit = defineEmits(['favoriteHandler'])
const color = ref("");
const isFavorite = ref(false)

onMounted(() => {
  // console.log( data.favorites)
  data.character.status === "Alive" && (color.value = "green");
  data.character.status === "Dead" && (color.value = "red");
  data.character.status === "unknown" && (color.value = "gray");

  const characterID = data.character.id
  isFavorite.value = data.favorites.some(id=> id===characterID)

});

function favoriteHandler() {
  isFavorite.value = !isFavorite.value 
  emit('favoriteHandler', data.character.id)
}

</script>

<style lang="css" scoped>
.dot {
  background-color: v-bind(color);
}
</style>
