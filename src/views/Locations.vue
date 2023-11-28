<template>
  <div>
    <h1
      class="text-3xl text-yellow-500 w-full text-center font-semibold tracking-widest mb-16"
    >
      Locations
    </h1>
    <div class="flex md:flex-row flex-wrap flex-col gap-4">
      <template v-for="item in data?.results" :key="item.id">
        <div class="w-[300px] p-4 bg-[#3c3e44] rounded-md">
          <h1 class="text-xl text-yellow-600">{{ item.name }}</h1>
          <p>{{ item.type }} - {{ item.dimension }}</p>
          <p @click="openModal(item.residents)" class="cursor-pointer">
            Residentes:
            <span class="text-yellow-600">{{ item.residents.length }}</span>
          </p>
        </div>
      </template>
    </div>
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
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl"
              >
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h3"
                        class="text-3xl font-semibold leading-6 text-gray-900 text-center my-6"
                        >Residentes de {{ residents[0].location.name }}</DialogTitle
                      >
                      <div class="flex flex-row flex-wrap gap-3 mt-2">
                        <div
                          v-for="resident in residents"
                          :key="resident.id"
                          class="text-black rounded-md border shadow w-[180px]"
                        >
                          <img :src="resident.image" :alt="resident.name" class="rounded-t-md" />
                          <div class="p-2 text-sm">
                            <h2 class="text-base">{{ resident.name }}</h2>
                            <p>{{ resident.status }} - {{ resident.species }} - {{ resident.gender }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
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
import { onMounted, ref } from "vue";
import { locationList, characterList } from "../providers/api";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const open = ref(false);
const data = ref(null);
const residents = ref([]);

onMounted(() => getLocations());

async function getLocations() {
  data.value = await locationList();
}

async function openModal(_residents) {
  const ids = [];
  for (const resident of _residents) {
    const id = resident.split("/").at(-1);
    ids.push(id);
  }
  residents.value = await characterList({ ids });
  open.value = true;
}
</script>

<style lang="scss" scoped></style>
