<template>
  <transition name="fade">
    <div
      class="rounded-sm font-roboto fixed top-52 left-1/2 transform -translate-x-1/2 p-6 max-w-2xl min-w-[320px] bg-darkblue text-white z-10"
    >
      <Close class="absolute top-1 right-1 cursor-pointer" @click="closeInfo" />
      <img
        :src="require(`@/assets/img/${image[$store.state.imageMessage]}`)"
        alt="konata"
        class="absolute top-0 left-0 w-32 transform -translate-y-full"
      />
      {{ $store.state.message }}
    </div>
  </transition>
</template>

<script>
import Close from "../../node_modules/vue-material-design-icons/Close.vue";
export default {
  components: { Close },
  data() {
    return {
      image: {
        welcome: "welcome.png",
        goodbye: "goodbye.png",
        error: "error.png",
        logout: "logout.png",
      },
    };
  },
  methods: {
    closeInfo() {
      this.$store.commit("SET_MESSAGE", null);
    },
  },
};
</script>

<style></style>
