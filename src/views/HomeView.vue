<template>
  <section class="mt-20 " style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
    <div class="mx-auto container  px-5">
      <h2 class="text-left text-2xl font-bold pt-6 my-4">Top animes do momento</h2>
      <div>
        <carousel :settings="settings" :breakpoints="breakpoints">
          <slide v-for="destaque in destaques" :key="destaque.name">
              <div class="w-full h-80 px-2">
                <router-link :to="`/anime/${destaque.name.toString().toLowerCase().replaceAll(' ','-')}`" class="h-full relative w-full">
                  <img :src="destaque.image" class="w-full h-full object-cover" alt=example/>
                  <div class="absolute bottom-0 -left-full bg-black/50 w-[200%] p-2  text-left">
                    <h3 class="text-sm text-white">
                      <span class="opacity-100">
                        {{destaque.name}}
                      </span>
                    </h3>
                    <!-- <p class=" text-white">breve descrição</p> -->
                    <!-- <span class="text-white text-xs">
                      De: Admin - 21/02/2020 ás 13:50
                    </span> -->
                  </div>
                </router-link>
              </div>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
  name: "HomeView",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    
  },
  data() {
    return {
      destaques:[],
      settings: {
      itemsToShow: 1,
      snapAlign: 'center',
      autoplay:"10000"
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'start',
      },
    },
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$cookies.remove("loginIdAnime");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDestaques(){
      let ref = firebase.database().ref('animes');
      ref.orderByValue().on("value", (snapshot) => {
        snapshot.forEach((ss) => {
          this.destaques.push(ss.val());
        });
        this.$store.commit('SET_LOADING',false)
      });
    }
  },
  mounted() {
    // if(this.$cookies.get("loginIdAnime")==null){
    // 	this.$router.push('/login')
    // }
    document.title = "Otaku Stars - Inicio";
    this.getDestaques()
  },
};
</script>
<style lang="postcss">
.carousel__prev--in-active, .carousel__next--in-active{
  @apply hidden;
}
</style>
