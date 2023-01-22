<template>
  <div class="w-screen h-full overflow-y-auto overflow-x-hidden p-10">
    <!-- if there's no ctf specified -->
    <div v-if="ctf==='' || ctf === undefined">
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
    <div v-else-if="ctf !== '' && ctf !== undefined && writeup==='' || writeup === undefined">
      <!-- return button -->
      <div @click="selectCtf('')" class="text-gray-500 cursor-pointer mb-2">← return</div>
      <!-- show the challenges list -->
      <ul class="space-y-6">
        <!-- list every challenge -->
        <li class="list-element" v-if="getWriteups(this.ctf)?.length > 0" v-for="writeup in getWriteups(this.ctf)">
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
      <div @click="selectWriteup('')" class="text-gray-500 cursor-pointer mb-2">← return</div>

      <!--show challenge's writeup -->

    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

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
    ...mapGetters([
      'getCtfs',
      'getWriteups',
      'getMarkdown'
    ])
  },
  mounted() {
    this.$writeups.getCtfs();
    //get writeups if there is a ctf specified in the url
    if (this.ctf) this.$writeups.getWriteups(this.ctf);
  },
  watch: {
    $route(to, from) {
      this.ctf = to.params.ctf;
      this.writeup = to.params.writeup;
    },
    ctf(newCtf, oldCtf) {
      if (newCtf === "") { return; }

      if (this.getWriteups(this.ctf) === undefined) {
        this.$writeups.getWriteups(newCtf);
      }
    },
  }
}
</script>


<style scoped>
.list-element {
  @apply bg-gray-700 opacity-75 hover:opacity-100 w-full rounded-xl p-4 transition-opacity duration-300 ease-in-out;
}
</style>