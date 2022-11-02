<template>
  <section class="mt-20">
    <div class="mx-auto container  px-5">
      <div>
        <carousel :items="destaques" title="Top animes do momento" link="top-moments" v-if="destaques.length"/>
        <carousel :items="destaques" title="Top animes de todos os tempos" link="top-all" v-if="destaques.length"/>
        <carousel :items="destaques" title="Animes a serem lançados" link="top-launchs" v-if="destaques.length"/>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import carousel from '@/components/carouselVue.vue'
export default {
  name: "HomeView",
  components:{
    carousel
  },
  data() {
    return {
      destaques:[],
    }
  },
  methods: {
    getDestaques(){
      let ref = firebase.database().ref('animes');
      ref.orderByChild('active').equalTo(true).limitToLast(10).on("value", (snapshot) => {
        this.destaques = []
        snapshot.forEach((ss) => {
          this.destaques.push(ss.val());
        });
        this.$store.commit('SET_LOADING',false)
      });
    }
  },
  mounted() {
    document.title = "Otaku Stars - Inicio";
    this.getDestaques()
  },
};
</script>

