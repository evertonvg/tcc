<template>
    <section class="mt-20 pb-20 pt-12">
      <div class="container-mini bg-white p-4">
        <div>
          <router-link to="/news" class="flex items-left justify-left mt-2" >
            <west>
          </west>
          Voltar
          </router-link>  
        </div>

        <h1 class="font-bold text-4xl text-left text-header mt-2">
          {{ news.title }}
        </h1>
        
        <img src="@/assets/img/loading-gif.gif" class="mx-auto mt-8 w-36" alt="gif loading" v-show="loading"/>

        <span class="text-left text-xs text-lightblue block mt-4">
          {{ commentedformattedHour(news.data) }} / por Admin
        </span>

        <div v-html="news.description" class="text-left mt-4 news-description">
         
        </div>
        <div class="text-left mt-4  border-t-[1px] border-black">
          <h4 class="text-left mx-2 font-bold italic mt-4" >Compartilhe</h4>
          <div class="flex items-start gap-4 mt-4">
            <a target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${route}%2F&amp;src=sdkpreparse`" class="fb-xfbml-parse-ignore">
              <img src="@/assets/img/facebook.png" alt="" class="w-12">
            </a>
          <a  target="_blank" :href="`https://api.whatsapp.com/send?text=${news.title}%20${route}`">
            <img src="@/assets/img/whatsapp.png" alt="" class="w-12">
          </a>
          <a  target="_blank" :href="`https://t.me/share/url?${route}=url&text=${news.title}`">
            <img src="@/assets/img/telegram-logo.png" alt="" class="w-12">
          </a>
          <a  target="_blank" :href="`https://twitter.com/intent/tweet?text=${news.title}%0a%0a${route}`">
            <img src="@/assets/img/twitter.png" alt="" class="w-12">
          </a>

          </div>
        </div>
      </div>
    </section>

    <section class="mt-4" v-show="allNews.length">
      <div class="container-mini bg-white p-4">
        <h2 class="text-left text-2xl font-bold my-4 ">Leia também</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link :to="`${n.slug}`" v-for="(n,index) in allNews.slice(0,3).reverse()" :key="index" @click="reload" >
                <div class="w-full h-[200px] lg:h-[250px]">
                    <img :src="n.image" :alt="n.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex flex-col text-left">
                    <span class="text-lightblue lg:text-sm text-xs text-left max-w-[75%] mt-1 mb-1">
                        {{ commentedformattedHour( n.data) }}
                    </span>
                    <span class="text-header font-semibold text-sm lg:text-base text-left max-w-[75%]">
                        {{ n.title }}
                    </span>
                    
                </div>
            </router-link>
        </div>
      </div>
    </section>
    
  </template>
  
  <script>
  import firebase from "firebase";
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
    data() {
        return {
          news:'',
          allNews:[],
          route:'',
          loading:true
      }
    },
    methods:{
      reload(){
        setTimeout(()=>{
                        window.location.reload()
                    },100)
      },
      shuffleArray() {
        // Loop em todos os elementos
            for (let i = this.allNews.length - 1; i > 0; i--) {
                    // Escolhendo elemento aleatório
                const j = Math.floor(Math.random() * (i + 1));
                // Reposicionando elemento
                [this.allNews[i], this.allNews[j]] = [this.allNews[j], this.allNews[i]];
            }

        },
      getNews(){
            let ref = firebase.database().ref('news');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                this.news =  ''
                
                snapshot.forEach((ss) => {
                    this.news = ss.val();
                });
              
                if(this.news.length == 0){
                    history.back();
                    setTimeout(()=>{
                        window.location.reload()
                    },100)
                }
                this.getallnews()
                this.loading = false

                

                this.$store.commit('SET_LOADING',false)
                document.title = `${this.news.title} - Otaku Stars`;
            });
        },
        getallnews(){
          let ref = firebase.database().ref('news');
            ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
                this.allNews =  []
                
                snapshot.forEach((ss) => {
                    this.allNews.push(ss.val()) 
                });
                this.getRecomended()
                this.$store.commit('SET_LOADING',false)
            });
        },
        getRecomended(){
          
          this.allNews = [...this.allNews].filter((item)=>{
              return this.news.tags.some((tag)=>{
                if(this.news.title != item.title){
                  return item.tags.includes(tag)
                }
              })
          })

          this.shuffleArray()
          
        },
    },
    
    mounted() {
      this.getNews()
      this.route = window.location.href
      
    },
  };
  </script>
  
  <style lang="postcss">

  @media(max-width:600px){
    .news-description{
      @apply mx-4;
    }
  }
.news-description{
  @apply text-left;
}
.news-description img{
  @apply mx-auto my-4;
}
.news-description iframe{
  @apply mx-auto my-4 w-full aspect-video;
}
.news-description p{
  @apply my-4;
}
.news-description a{
  @apply text-orange1;
}
  


  .container-mini {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}





@media (min-width: 576px){
.container-mini {
    max-width: 540px;
}
}
@media (min-width: 768px){
.container-mini {
    max-width: 720px;
}
}
@media (min-width: 992px){
.container-mini {
    max-width: 960px;
}
}
@media (min-width: 1200px){
.container-mini {
    max-width: 1140px;
}
}
@media (min-width: 576px){
.container-sm, .container-mini {
    max-width: 540px;
}
}
@media (min-width: 768px){
.container-md, .container-sm, .container-mini {
    max-width: 720px;
}
}
@media (min-width: 992px){
.container-lg, .container-md, .container-sm, .container-mini {
    max-width: 960px;
}
}
@media (min-width: 1200px){
.container-xl, .container-lg, .container-md, .container-sm, .container-mini {
    max-width: 1140px;
}
}

  
</style>
  