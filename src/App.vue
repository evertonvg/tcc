<template>
  <main>
    <transition name="fade" >
      <LoadingVue />
    </transition>

    <MenuVue />
  
    <transition name="fade">
      <WarningVue v-if="$store.state.message != null" />
    </transition>

    <router-view v-slot="{ Component }">

        <component :is="Component" />

    </router-view>

    <transition name="fade">
      <FooterVue/>
    </transition>

  </main>
</template>
<script>
import MenuVue from "./components/menuVue.vue";
import WarningVue from "./components/warningVue.vue";
import LoadingVue from "./components/loadingVue.vue";
import FooterVue from "./components/footerVue.vue";

export default {
  methods:{
    closeWarnings(){
      window.addEventListener('keydown', (ev)=>{
        if(ev.key=='Escape'){
          this.$store.commit("SET_MESSAGE", null);
        }
      })
    }
  },

  components: {
    MenuVue,
    WarningVue,
    LoadingVue,
    FooterVue
},
mounted(){
  this.closeWarnings()
}
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

.btn{
  @apply bg-red text-white font-roboto font-normal px-2 py-1 rounded-sm transition-colors cursor-pointer;
}
.btn:hover{
  @apply bg-red2;
}
.fade-enter-active{
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.translate-enter-active{
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.translate-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.translate-enter-from{
  opacity:0;
  transform: translateY(-25px);
}
.translate-leave-to{
  opacity:1;
  transform: translateY(0);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
