<script setup>
import Navbar from "./components/Navbar.vue";
import CustomFooter from "./components/CustomFooter.vue";

</script>

<template>
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
  <!-- <div class=""> -->
    <nav>
      <navbar />
    </nav>
    <main class="">
      <router-view></router-view>
    </main>
    <custom-footer />
  </div>
</template>

<style scoped></style>
