<template>
  <div>
    <h1
      class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest mb-16"
    >
      Characters
    </h1>
    <form class="flex md:flex-row flex-col gap-4 my-10">
      <input v-model="filter.name" placeholder="Nombre" />
      <input v-model="filter.species" placeholder="Especie" />
      <input v-model="filter.type" placeholder="Tipo" />
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
        @click="sendForm"
        class="border border-white px-6 text-white rounded-md bg-[#3c3e44]"
      >
        Buscar
      </button>
    </form>
    <div class="flex md:flex-row flex-wrap flex-col gap-6">
      <template v-for="item in data?.results" :key="item.id">
        <character-card :character="item" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { characterList } from "../providers/api";
import { onMounted, ref } from "vue";
import CharacterCard from '../components/CharacterCard.vue';

const data = ref(null);

const filter = {
  name: null,
  species: null,
  type: null,
  status: null,
  gender: null,
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

onMounted(() => getCharacters());

function sendForm() {
  getCharacters()
}

async function getCharacters() {
  data.value = await characterList({filter});
}
</script>

<style lang="css" scoped>

input, select {
  color: white;
  border: 1px solid#3c3e44;
  border-radius: 7px;
  padding: 5px 10px;
  background-color: #3c3e44;
}

input::placeholder{
  color:white
}
</style>
