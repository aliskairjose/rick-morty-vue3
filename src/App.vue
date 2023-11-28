<script setup>
import Navbar from "./components/Navbar.vue";
import CustomFooter from "./components/CustomFooter.vue";

</script>

<template>
  <div class="w-full">
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
