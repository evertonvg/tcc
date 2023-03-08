<template>
    <div class="container mx-auto mt-24 pb-20 px-5 md:px-0">
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-if="$route.params.category">Lista de animes da categoria {{ $route.params.category }}</h2>
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-else>Lista de animes</h2>
        <div class="flex justify-center pt-20">
   
            <div class="mb-3 xl:w-full">
                <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    v-model="pesquisa"
                    class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Pesquise o nome de algum anime"
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
    </div>
    <div class="container mx-auto pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 md:px-0">
        <router-link v-show="pesquisa=='' || destaque.length==0 || destaque.name.toLowerCase().includes(pesquisa.toLowerCase())" v-for="(destaque,index) in destaques" :key="index" :to="`/animes/${destaque.slug}`" class="sm:h-full relative w-full bg-gradient-to-b from-white to-header h-64">
            <cardVue :item="destaque" class="bg-gradient-to-b from-white to-header" />
        </router-link>
    </div>

    <p v-show="pesquisa!='' && !destaques.some(item => item.name.includes(pesquisa.toLowerCase()))" class="text-center text-white">Nehhum resultado encontrado</p>
  </template>
  
  <script>
  import cardVue from '@/components/cardVue.vue'
  import firebase from "firebase";

  export default {
    components: {
        cardVue
    },
    data() {
        return {
        destaques:[],
        pesquisa:''
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
        
        let cat = [];
        let arr = [];

        if(this.$route.params.category){
            this.destaques = this.destaques.map((item)=>{
                cat = Object.values(item.categories).map((it)=>{
                    return it.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                }) 

                if (Object.values(cat).indexOf(this.$route.params.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) > -1) {
                    console.log('has test1');
                    arr.push(item)
                    return item
                }
            })
            this.destaques = arr

        }
      });
    }
  },
    mounted() {
      document.title = "Otaku Stars - Pesquisa";
        this.getDestaques()
    },
  };
  </script>
  
  <style></style>
c  