<template>
  <div class="w-screen h-full overflow-y-auto overflow-x-hidden p-10">
    <!-- if there's no ctf specified -->
    <div v-if="ctf===''">
      <!-- show the ctf list -->
      <ul class="space-y-6">
        <!-- list every ctf -->
        <li class="list-element" v-if="getCtfs.length > 0" v-for="ctf in getCtfs">
          <div @click="selectCtf(ctf)" class="text-xl text-white">{{ctf}}</div>
        </li>

        <!-- if there's no ctf -->
        <li v-else>
          <div class="text-base sm:text-xl md:text-2xl text-white text-center">Oops, looks like there is no CTF yet.... 😕</div>
        </li>
      </ul>
    </div>

    <!-- if there is a ctf specified but no challenge specified -->
    <div v-else-if="ctf!==''&&writeup===''">
      <!-- return button -->
      <div @click="selectCtf('')" class="text-gray-500">← return</div>
      <!-- show the challenges list -->
      <ul class="space-y-6">
        <!-- list every challenge -->
        <li class="list-element" v-if="ctfs[ctf]?.length > 0" v-for="writeup in ctfs[ctf]">
          <div @click="selectWriteup(writeup)" class="text-xl text-white">{{writeup}}</div>
        </li>

        <!-- if there's no challenge -->
        <li v-else>
          <div class="text-base sm:text-xl md:text-2xl text-white text-center">Oops, looks like there is no write-up yet.... 😕</div>
        </li>
      </ul>
    </div>

    <!-- if there is a ctf specified and a challenge specified -->
    <div v-else>
      <!-- return button -->
      <div @click="selectWriteup('')" class="text-gray-500">← return</div>

      <!--show challenge's writeup -->

    </div>
  </div>
</template>

<script>

import writeups from "../plugins/writeups.js";

export default {
  name: "Write-ups",
  data() {
    return {
      ctf: this.$route.params.ctf,
      writeup: this.$route.params.writeup,
    }
  },
  methods: {
    selectCtf(ctf) {
      this.$router.push({name: 'write-ups', params: {ctf}})
    },
    selectWriteup(writeup) {
      this.$router.push({name: 'write-ups', params: {ctf:this.ctf, writeup}})
    }
  },
  computed: {
    getCtfs() {
      //make the store available to the template
      return this.$store.getters.getCtfs;
    },
    ctfs() {
      //make the store available to the template
      return this.$store.state.ctfs;
    }
  },
  mounted() {
    this.$writeups.getCtfs();
    this.$writeups.getWriteups(this.ctf)
  },
  watch: {
    $route(to, from) {
      this.ctf = to.params.ctf || '';
      this.writeup = to.params.writeup || '';
    },
    ctf(newCtf, oldCtf) {
      if (newCtf === "") { return; }

      if (this.$store.state.ctfs[newCtf]?.length === 0) {
        this.$writeups.getWriteups(newCtf);
      }
    }
  }
}
</script>


<style scoped>
.list-element {
  @apply bg-gray-700 opacity-75 hover:opacity-100 w-full rounded-xl p-4 transition-opacity duration-300 ease-in-out;
}
</style>