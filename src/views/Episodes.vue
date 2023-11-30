<template>
  <div>
    <h1
      class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest my-8"
    >
      Episodes
    </h1>
    <form class="grid xl:grid-flow-col grid-flow-row gap-4 my-10">
      <input v-model="filter.name" placeholder="Nombre" />
      <input v-model="filter.episode" placeholder="Episodio" />
      <button
        type="button"
        @click="getEpisodes"
        class="border border-white px-6 text-white rounded-md bg-[#3c3e44]"
      >
        Buscar
      </button>
    </form>
    <div class="flex md:flex-row flex-wrap flex-col lg:gap-4 gap-2 mb-8">
      <template v-for="item in results" :key="item.id">
        <div
          class="lg:w-[300px] md:w-[350px] w-full p-4 bg-[#3c3e44] rounded-md box-border"
        >
          <h1 class="text-xl text-yellow-600">
            {{ item.name }} -
            <span class="text-base text-white">{{ item.episode }}</span>
          </h1>
          <p>{{ item.air_date }}</p>
          <p @click="openModal(item)" class="cursor-pointer">
            Personajes:
            <span class="text-yellow-600">{{ item.characters.length }}</span>
          </p>
        </div>
      </template>
    </div>
    <vue-awesome-paginate
      :total-items="info.count"
      :items-per-page="info.count / info.pages"
      v-model="currentPage"
      :on-click="onClickHandler"
      
    />
  </div>
  <!-- Modal -->
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-[#272b33] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl"
              >
                <div class="bg-[#272b33] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div
                      class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full"
                    >
                      <DialogTitle
                        as="h3"
                        class="text-3xl font-semibold leading-6 text-center my-6"
                        >Personajes del episodio
                        <span class="text-yellow-600">{{ episodeName }}</span>
                      </DialogTitle>
                      <div class="flex flex-row flex-wrap gap-3 mt-2">
                        <div
                          v-for="resident in residents"
                          :key="resident.id"
                          class="rounded-md w-[180px] bg-[#3c3e44]"
                        >
                          <img
                            :src="resident.image"
                            :alt="resident.name"
                            class="rounded-t-md"
                          />
                          <div class="p-2 text-sm">
                            <h2 class="text-base">{{ resident.name }}</h2>
                            <p>
                              {{ resident.status }} - {{ resident.species }} -
                              {{ resident.gender }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 bg-[#272b33]"
                >
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-[#3c3e44] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#3c3e44] sm:ml-3 sm:w-auto"
                    @click="open = false"
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { episodeList, characterList } from "../providers/api";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const currentPage = ref(1);
const results = ref([]);
const info = ref({
  count: 0,
  pages: 0,
  next: "",
  prev: null,
});

const open = ref(false);
const residents = ref([]);
const episodeName = ref("");
const filter = {
  name: "",
  episode: "",
  page: null,
};

onMounted(() => getEpisodes());

async function getEpisodes() {
  const data = await episodeList({ filter });
  info.value = data.info;
  results.value = data.results;
}

const onClickHandler = async (page) => {
  filter.page = page;
  await getEpisodes();
};

async function openModal(episodio) {
  episodeName.value = episodio.name;
  const ids = [];
  for (const character of episodio.characters) {
    const id = character.split("/").at(-1);
    ids.push(id);
  }

  episodio.characters.length === 1
    ? (residents.value = [await characterList({ ids })])
    : (residents.value = await characterList({ ids }));

  open.value = true;
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
