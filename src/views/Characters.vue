<template>
  <div class="full">
    <h1
      class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest my-8"
    >
      Characters
    </h1>
    <div class="w-full">
      <form class="flex md:flex-row flex-col gap-3 my-10">
        <input v-model="filter.name" placeholder="Nombre" />
        <input v-model="filter.species" placeholder="Especie" />
        <select v-model="filter.gender">
          <option
            v-for="gender in genders"
            :key="gender.value"
            :value="gender.value"
            :selected="gender.value === filter.gender"
          >
            {{ gender.text }}
          </option>
        </select>
        <select v-model="filter.status">
          <option
            v-for="s in status"
            :key="s.value"
            :value="s.value"
            :selected="s.value === filter.status"
          >
            {{ s.text }}
          </option>
        </select>
        <button
          type="button"
          @click="getCharacters"
          class="border border-white px-6 text-white rounded-md bg-[#3c3e44]"
        >
          Buscar
        </button>
      </form>
    </div>
    <div v-if="isLoading" class="grid place-content-center h-96">
      <Spinner />
    </div>
    <div class="flex md:flex-row flex-wrap flex-col gap-6 mb-8" v-else>
      <template v-for="item in results" :key="item.id">
        <character-card
          :character="item"
          :favorites="favorites"
          @favorite-handler="setFavorite"
        />
      </template>
    </div>
    <vue-awesome-paginate
      :total-items="info.count"
      :items-per-page="info.count / info.pages"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
</template>

<script setup>
import { characterList } from "../providers/api";
import { onMounted, ref } from "vue";
import CharacterCard from "../components/CharacterCard.vue";
import Spinner from "../components/Spinner.vue";

const isLoading = ref(true);
const currentPage = ref(1);
const results = ref([]);
const info = ref({
  count: 0,
  pages: 0,
  next: "",
  prev: null,
});

const filter = {
  name: null,
  species: null,
  type: null,
  status: null,
  gender: null,
  page: null,
};

const genders = [
  {
    text: "Seleccione un genero",
    value: null,
  },
  {
    text: "Masculino",
    value: "male",
  },
  {
    text: "Femenino",
    value: "female",
  },
  {
    text: "Sin género",
    value: "genderless",
  },
  {
    text: "Desconocido",
    value: "unknow",
  },
];

const status = [
  {
    text: "Seleccione un estado",
    value: null,
  },
  {
    text: "Vivo",
    value: "alive",
  },
  {
    text: "Muerto",
    value: "dead",
  },
  {
    text: "Desconocido",
    value: "unknow",
  },
];

let favorites = [];

onMounted(() => {
  if (localStorage.getItem("favorites")) {
    try {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } catch (e) {
      localStorage.removeItem("favorites");
    }
  }
  getCharacters();
});

function setFavorite(id) {
  const index = favorites.findIndex((_id) => _id === id);
  index === -1 ? favorites.push(id) : favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

const onClickHandler = async (page) => {
  filter.page = page;
  await getCharacters();
};

async function getCharacters() {
  isLoading.value = true;
  const data = await characterList({ filter });
  results.value = data.results;
  info.value = data.info;
  isLoading.value = false;
}
</script>

<style lang="css" scoped>
input,
select {
  color: white;
  border: 1px solid#3c3e44;
  border-radius: 7px;
  padding: 5px 10px;
  background-color: #3c3e44;
}

input::placeholder {
  color: white;
}
</style>
