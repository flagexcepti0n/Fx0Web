<template>
  <div class="flex justify-center">
    <h2 class="text-white text-xl">{{ writeup }} : {{ challenge }}</h2>
  </div>
</template>

<script>
export default {
  name: "Writeup",
  data() {
    return {
      writeup: this.$route.params.ctf,
      challenge: this.$route.params.challenge
    }
  }
}
</script>

<style scoped>

</style>