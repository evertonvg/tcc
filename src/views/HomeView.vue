<template>
  <!-- <header class="h-[500px] w-full relative"> -->
    <!-- <picture>
      <source media="(max-width:650px)" :srcset="bannermobile">
      <img  alt="banner" :src="banner" class="w-full h-full object-cover absolute top-2/4 left-0 -translate-y-2/4">
    </picture> -->

    <!-- <div class="container mx-auto relative h-full px-4">
      <h1 class="absolute top-2/4 right-4  font-bold max-w-sm md:max-w-lg text-left text-3xl text-black shadow-blue drop-shadow-lg">Bem vindo ao Otaku Stars. Aqui você poderá avaliar e conferir diversos animes.</h1>
    </div>
  </header> -->

  <!-- <div v-for="(n,index) in news" :key="index" v-html="n.description">

  </div> -->
  <section class="mt-20">
    <div class="mx-auto container px-5">
      <h2 class="text-left text-2xl font-bold pt-6 my-4">Noticias</h2>
        
        <div class="flex flex-col lg:grid gap-4 h-[900px] lg:h-[600px] overflow-hidden">

          <router-link :class="[`flex-1 h-full w-full flex relative bg-blue overflow-hidden`, index==0 ?'col-start-1 col-end-2 row-start-1 row-end-2 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3' : '',index==1 ?'col-start-1 col-end-2 row-start-2 row-end-3 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2' : '',index==2 ?'col-start-1 col-end-1 row-start-3 row-end-4 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3' : '']" v-for="(n,index) in news.slice().reverse()" :key="index" :to="`news/${n.slug}`" >
            
                <img :src="n.image" :alt="n.title" class="object-cover w-full h-full"/>
                
                <div class=" flex flex-col gap-1 bottom-0 left-0 w-full p-5 absolute" style="background-image:linear-gradient(180deg, transparent 0%, rgb(20, 20, 20) 55%)">
                  <span class="text-white font-semibold text-xl lg:text-2xl text-left max-w-[75%]">
                    {{ n.title }}
                  </span>
                  <span class="text-white lg:text-sm text-xs text-left max-w-[75%]">
                    {{ commentedformattedHour( n.data) }}
                  </span>


                </div>
              
            </router-link>
        
        </div>

        <div class="mt-5 h-5">
          <router-link to="news" class="float-right block btn">
            Ver todas as noticias
          </router-link>
        </div>
        
    </div>
  </section>

  <section class="mt-20">
      <div class="mx-auto container  px-5">
        
      <div>
        <carousel :items="mostEvaluations" title="Mais avaliados" link="search?type=evaluations" v-if="mostEvaluations.length"/>
        <carousel :items="mostComments" title="Mais comentados" link="search?type=comments" v-if="mostComments.length"/>
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
import bannermobile from '@/assets/img/mobilebanner.jpg'
import {  useDateFormat } from '@vueuse/core';

export default {
  setup(){
        const formatted = (data) =>{
            return useDateFormat(data, 'YYYY');
        }
        const commentedformatted = (data) =>{
            return useDateFormat(data, 'DD/MM/YYYY');
        }
        const commentedformattedHour = (data) =>{
            return useDateFormat(data, 'DD/MM/YYYY - HH:mm');
        }
        return {formatted,commentedformatted,commentedformattedHour}
    },
  name: "HomeView",
  components:{
    carousel
  },
  data() {
    return {
      destaques:[],
      news:[],
      idDestaques:[],
      banner: banner,
      bannermobile:bannermobile,
      launchs:[],
      newtemps:[],
      exibition:[],
      mostComments:[],
      mostEvaluations:[],
      comments:[],
      evaluations:[]
    }
  },
  methods: {
    getNews(){
      let ref = firebase.database().ref('news');
      ref.orderByChild('active').equalTo(true).limitToLast(3).on("value", (snapshot) => {
          this.news =  []
          snapshot.forEach((ss) => {
              this.news.push(ss.val());
          });
      });
    },
    getComments(){
      let ref = firebase.database().ref('comments');
      ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
          this.comments =  []
          snapshot.forEach((ss) => {
              this.comments.push(ss.val());  
          });

          this.destaques.forEach((destaque,ind)=>{

            let totalcomments = this.comments.filter((item)=>{
              return item.idAnime == this.idDestaques[ind]
            }).length;
            destaque.comments = totalcomments
          })      
      });

    },
    getEvaluations(){
      let ref = firebase.database().ref('evaluations');
      ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
          this.evaluations = []
          snapshot.forEach((ss) => {
              this.evaluations.push(ss.val());
          });
          this.destaques.forEach((destaque,ind)=>{

            let totalvotes = this.evaluations.filter((item)=>{
              return item.idAnime == this.idDestaques[ind]
            }).length;
            destaque.evaluations = totalvotes
          })
          
          
      });
    },
    setCarousels(){
        this.launchs = this.destaques.filter((item)=>{
          return item.newAnime == true
        })
        this.newtemps = this.destaques.filter((item)=>{
          return item.newSeason == true
        })
        this.exibition = this.destaques.filter((item)=>{
          return item.activeSeason == true
        })
        this.mostEvaluations = [...this.destaques].sort((x,y)=>{
            let a = x.evaluations
            let b = y.evaluations
            return b-a
        })
        this.mostComments = [...this.destaques].sort((x,y)=>{
            let a = x.comments
            let b = y.comments
            return b-a
        })
    },
    getDestaques(){
      let ref = firebase.database().ref('animes');
      ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
        this.destaques = []
        this.idDestaques = []
        snapshot.forEach((ss) => {
          this.destaques.push(ss.val());
          this.idDestaques.push(ss.key);
        });
        this.$store.commit('SET_LOADING',false)

        this.getComments()
        this.getEvaluations()
        setTimeout(()=>{
          this.setCarousels()
        },200)
      });
    }
  },
  mounted() {
    document.title = "Otaku Stars - Inicio";
    this.getDestaques()
    this.getNews()
  },
};
</script>

