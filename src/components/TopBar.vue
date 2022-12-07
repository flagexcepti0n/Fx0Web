<template>
  <div class="top-0 left-0 w-screen h-20 bg-gray-900 bg-opacity-50 grid grid-cols-3 overflow-hidden">
    <!--left-->
    <div class="h-full flex flex-row items-center justify-start px-7 space-x-4">
      <button @click="redirect('home')" class="text-center align-middle text-gray-50">home</button>
      <button @click="redirect('writeup')" class="text-center align-middle text-gray-50">writeup</button>
    </div>

    <!--logo (middle)-->
    <div class="h-full flex flex-row items-center justify-center">
      <img class="h-10" src="../assets/FlagException.svg" alt="FlagException">
    </div>

    <!--right-->
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    redirect(name) {
      this.$router.push({name})
    }
  }
}
</script>

<style scoped>

</style>