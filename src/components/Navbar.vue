<template>
  <div class="h-[80px] flex flex-row justify-center items-center gap-12">
    <!-- 
      Usando :to se llama a la ruta por el nombre que se le dio en la configuracion de rutas, 
      funciona igual que con la url
     -->
    <router-link
      to="/"
      class="hover:text-yellow-500 hover:border hover:border-yellow-500 hover:p-2 hover:rounded-md"
      >Characters</router-link
    >
    <router-link
      to="/episodes"
      class="hover:text-yellow-500 hover:border hover:border-yellow-500 hover:p-2 hover:rounded-md"
      >Episodes</router-link
    >
    <router-link
      :to="{ name: 'Locations' }"
      class="hover:text-yellow-500 hover:border hover:border-yellow-500 hover:p-2 hover:rounded-md"
      >Locations</router-link
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
