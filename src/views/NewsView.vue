<template>
    <div class="container mx-auto mt-20 pb-20 ">
        <div class="flex justify-center container mx-auto mt-32">
        <div class="mb-3 xl:w-full">
            <div class="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                  type="search"
                  v-model="search"
                  class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  placeholder="Pesquise o titulo de alguma noticia."
                  aria-label="Search"
                  aria-describedby="button-addon1" />
              <button
                  class="relative z-[2] flex items-center rounded-r bg-blue px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5">
                  <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd" />
                  </svg>
              </button>
            </div>
        </div>
    </div>
        <h2 class="text-left text-2xl font-bold pt-6 my-4 mx-5">Noticias</h2>
        <img src="@/assets/img/loading-gif.gif" class="mx-auto mt-8 w-36" alt="git loading" v-show="loading"/>
        <div class="mx-5 xl:mx-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4" ref="newsitens" v-show="news.length">
            <transition-group name="translate">
            <router-link :to="`news/${n.slug}`" v-for="(n,index) in news.slice().reverse()" :key="index" v-show="index  < pageLimit">
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
        </transition-group>
        <span ref="distancelimit" class="distancelimit"></span>
        </div>
        <p  v-show="!news.length && loaddone" class="text-center text-black">Nehhum resultado encontrado</p>
    </div>
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
        loading:true,
      news:[],
      newsFilter:[],
      newsTotal:[],
      pageLimit:9,
      search:'',
      loaddone:false

    }
  },
  watch:{
    search(){
        if(this.search==''){
            this.news = this.newsTotal
        }else{
            this.news = this.newsTotal.filter((item)=>{
                return item.title.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    }
  },
    methods:{
        getNews(){
            let ref = firebase.database().ref('news');
            ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
                this.news =  []
                this.newsFilter =  []
                this.newsTotal =  []
                snapshot.forEach((ss) => {
                    this.news.push(ss.val());
                    this.newsFilter.push(ss.val());
                    this.newsTotal.push(ss.val());
                });
                this.loaddone = true
                this.loading = false
                this.moreNews()
            });
        },
        moreNews(){
            let distancelimit
            window.addEventListener('scroll',()=>{
                distancelimit = document.querySelector('.distancelimit')
                if(distancelimit){
                    if((window.pageYOffset + window.innerHeight * (0.85)) > distancelimit.offsetTop){
                    if(this.pageLimit < this.news.length){
                        this.pageLimit = this.pageLimit + 9
                    }
                }
                }
               
        })
        },

    },  
    mounted() {
      document.title = "Otaku Stars - Noticias";
      this.$store.commit('SET_LOADING',false)
      this.getNews()
      
    },
  };
  </script>
  
  <style></style>
  