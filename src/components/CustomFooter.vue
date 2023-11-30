<template>
  <footer class="w-full pt-4 ">
      <hr class="h-0.5 border-t-0 bg-blue-100 opacity-100 dark:opacity-50 " />
      <div class="flex lg:flex-row flex-col items-center lg:p-6 p-4 w-full mx-auto">
        <div class="flex lg:flex-1 flex-none text-left md:text-base text-sm ">
          © {{date.getFullYear()}}. Desarrollada con
          <!-- <img src={reactLogo} class="ms-1 h-5" />
          <img src={viteLogo} class="h-5" /> -->
          <img
            class="h-5 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </div>
        <div class="lg:flex-1 flex-none">
          <div class="border rounded w-fit float-right p-1">
            <a
              href="https://github.com/aliskairjose/rick-morty-vue3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <!-- <img src={gitHubLogo} alt="github" class="float-right h-5" /> -->
              <span class="mx-2 text-sm">Source code</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
</template>

<script setup>
  import {ref} from 'vue'

  const date = new Date()
</script>

<style lang="scss" scoped>

</style>