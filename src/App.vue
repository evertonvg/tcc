<template>
  <menuVue />
  <transition name="fade">
    <warningVue v-if="$store.state.message != null" />
  </transition>
  <transition name="fade">
    <router-view />
  </transition>
</template>
<script>
import menuVue from "./components/menuVue.vue";
import warningVue from "./components/warningVue.vue";
export default {
  components: {
    menuVue,
    warningVue,
  },
};
</script>

<style lang="postcss">
@font-face {
  font-family: "otaku";
  src: url("@/assets/fonts/otaku-rant.ttf");
}
@font-face {
  font-family: "otaku-bold";
  src: url("@/assets/fonts/otaku-rant-bold.ttf");
}
@font-face {
  font-family: "otaku-italic";
  src: url("@/assets/fonts/otaku-rant-italic.ttf");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  @apply mx-auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
