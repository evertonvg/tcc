<template>
  <header class="h-[500px] w-full relative">
    <img alt="banner" :src="banner" class="w-full h-full object-cover absolute top-2/4 left-0 -translate-y-2/4" />
    <div class="container mx-auto relative h-full px-4">
      <h1 class="absolute top-2/4 right-4  font-bold max-w-lg text-left text-3xl">Bem vindo ao Otaku Stars. Aqui você poderá avaliar e conferir diversos animes.</h1>
    </div>
  </header>
  <section class="mt-20">
      <div class="mx-auto container  px-5">
        
      <div>
        <carousel :items="destaques" title="Mais votados" link="top-famous" v-if="destaques.length"/>
        <carousel :items="destaques" title="Mais comentados" link="top-famous" v-if="destaques.length"/>
        <carousel :items="exibition" title="Animes em exibição" link="search?type=exibition" v-if="exibition.length" />
        <carousel :items="newtemps" title="Novas temporadas a serem lançadas" link="search?type=newtemps" v-if="newtemps.length" />
        <carousel :items="launchs" title="Animes novos a serem lançados" link="search?type=launchs" v-if="launchs.length" />
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import carousel from '@/components/carouselVue.vue'
import banner from '@/assets/img/banner.png'
export default {
  name: "HomeView",
  components:{
    carousel
  },
  data() {
    return {
      destaques:[],
      banner: banner,
      launchs:[],
      newtemps:[],
      exibition:[]
    }
  },
  methods: {
    getDestaques(){
      let ref = firebase.database().ref('animes');
      ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
        this.destaques = []
        snapshot.forEach((ss) => {
          this.destaques.push(ss.val());
        });
        this.$store.commit('SET_LOADING',false)
        this.destaques.sort((x,y)=>{
            let a = x.name.toLowerCase()
            let b = y.name.toLowerCase()
            return  a == b ? 0 : a > b ? 1 : -1
        })
        this.launchs = this.destaques.filter((item)=>{
          return item.newAnime == true
        })
        this.newtemps = this.destaques.filter((item)=>{
          return item.newSeason == true
        })
        this.exibition = this.destaques.filter((item)=>{
          return item.activeSeason == true
        })
      });
    }
  },
  mounted() {
    document.title = "Otaku Stars - Inicio";
    this.getDestaques()
  },
};
</script>

