<template>
  <transition name="fade">
    <LoadingVue />
  </transition>
  <transition name="fade">
    <menuVue />
  </transition>
  <transition name="fade">
    <warningVue v-if="$store.state.message != null" />
  </transition>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import menuVue from "./components/menuVue.vue";
import warningVue from "./components/warningVue.vue";
import LoadingVue from "./components/loadingVue.vue";
export default {
  components: {
    menuVue,
    warningVue,
    LoadingVue
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
  src: url("@/assets/fonts/animeace2_bld.ttf");
}
@font-face {
  font-family: "anime-italic";
  src: url("@/assets/fonts/animeace2_ital.ttf");
}
@font-face {
  font-family: "anime";
  src: url("@/assets/fonts/animeace2_reg.ttf");
}
@font-face {
  font-family: "anime-bold";
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
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
