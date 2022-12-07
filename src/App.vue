<template>
  <!-- This is the page area -->
  <div class="bg-gray-800 top-0 left-0 w-screen h-screen overflow-hidden">
    <!-- This is the top bar -->
    <TopBar/>

    <!-- This is the main content area -->
    <div class="w-screen ">
      <router-view/>
    </div>


  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";

export default {
  name: "App",
  components: {TopBar}
}
</script>

<style scoped>
</style>
