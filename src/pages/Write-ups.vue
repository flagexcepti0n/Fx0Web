<template>
  <div class="flex justify-center">
    <!-- if there's no ctf specified -->
    <div v-if="ctf===''" class="flex flex-col justify-center items-center">
      <!-- show the ctf list -->
      <ul class="w-screen h-full overflow-y-auto p-10 space-y-6">
        <!-- list every ctf -->
        <li class="list-element" v-if="store.getters.getCtfs.length > 0" v-for="ctf in store.getters.getCtfs">
          <div @click="selectCtf(ctf)" class="text-xl text-white">{{ctf}}</div>
        </li>

        <!-- if there's no ctf -->
        <li v-else>
          <div class="text-base sm:text-xl md:text-2xl text-white text-center">Oops, it appears that there's no ctf yet.. 😕</div>
        </li>
      </ul>
    </div>

    <!-- if there is a ctf specified but no challenge specified -->
    <div v-else-if="ctf!==''&&challenge===''">
      <!-- return button -->
      <div @click="selectCtf('')" class="text-gray-500 w-screen">← return</div>
    </div>

    <!-- if there is a ctf specified and a challenge specified -->
    <div v-else>
      <!--show challenge's writeup -->
    </div>
  </div>
</template>

<script>

export default {
  name: "Write-ups",
  data() {
    return {
      ctf: this.$route.params.ctf,
      challenge: this.$route.params.challenge,
    }
  },
  methods: {
    selectCtf(ctf) {
      this.$router.push({name: 'write-ups', params: {ctf: ctf}})
    },
  },
  computed: {
    store() {
      //make the store available to the template
      return this.$store;
    },
  },
  mounted() {
    this.$writeups.getCtfs();
  },
  watch: {
    $route(to, from) {
      this.ctf = to.params.ctf || '';
      this.challenge = to.params.challenge || '';
    }
  }
}
</script>


<style scoped>
.list-element {
  @apply bg-gray-700 opacity-75 hover:opacity-100 w-full rounded-xl p-4 transition-opacity duration-300 ease-in-out;
}
</style>