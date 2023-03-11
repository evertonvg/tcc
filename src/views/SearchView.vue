<template>
    <div class="container mx-auto mt-24 px-5 md:px-0">
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-if="$route.params.category">Lista de animes da categoria {{ $route.params.category }}</h2>
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-else>Lista de animes</h2>
        <div class="flex justify-center">
   
            <div class="mb-3 xl:w-full">
                <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    v-model="pesquisa"
                    class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    placeholder="Pesquise o nome de algum anime. Minimo de 3 letras."
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
    <h2 class="text-left text-2xl font-bold pt-6 my-4 container mx-auto" >Lista de categorias</h2>
    <div class="container mx-auto pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-10 gap-4 px-5 md:px-0">
        <div v-for="(cat,index) in categories" :key="index" class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
                class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid  outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-blue  checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                type="checkbox"
                :value="cat.name"
                v-model="setCategories"
                :id="cat.name+'cat'" />
            <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer float-left font-bold"
                :for="cat.name+'cat'">
                {{ cat.name }}
            </label>
        </div>
    </div>
    {{ setCategories }} {{ setCategories.length }}
    
    <div class="container mx-auto pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 md:px-0">
        <router-link  v-for="(destaque,index) in filterDestaques" :key="index" :to="`/animes/${destaque.slug}`" class="sm:h-full relative w-full bg-gradient-to-b from-white to-header h-64">
            <cardVue :item="destaque" class="bg-gradient-to-b from-white to-header" />
        </router-link>
    </div>
    

    <p v-show="!filterDestaques.length" class="text-center text-white">Nehhum resultado encontrado</p>

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
        filterDestaques:[],
        pesquisa:'',
        categories:[],
        setCategories:[]
        }
    },
    watch:{
        pesquisa(){
            this.setFilter()
            
        },
        setCategories(){
            this.setFilter()
        }
      
    },
    methods: {
    getDestaques(){
      let ref = firebase.database().ref('animes');
      ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
        this.destaques = []
        this.filterDestaques = []
        snapshot.forEach((ss) => {
          this.destaques.push(ss.val());
          this.filterDestaques.push(ss.val());
        });
        this.destaques.sort((x,y)=>{
            let a = x.name.toLowerCase()
            let b = y.name.toLowerCase()
            return  a == b ? 0 : a > b ? 1 : -1
        })
        
        this.setFilter()
        this.$store.commit('SET_LOADING',false)
        
      });
    },
    getCategories(){
        let ref = firebase.database().ref('categories');
        ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
            this.categories = [];
            snapshot.forEach((ss) => {
            this.categories.push(ss.val());
            });
            this.$store.commit('SET_LOADING',false)
            this.categories.sort((x,y)=>{
                let a = x.name.toLowerCase()
                let b = y.name.toLowerCase()
                return  a == b ? 0 : a > b ? 1 : -1
            })
            if(this.$route.params.category){
                const word = this.$route.params.category
                const capitalized =
                word.charAt(0).toUpperCase()
                + word.slice(1)


                this.setCategories.push(capitalized)
            }
        });
    },
    setFilter(){
        this.filterDestaques = this.destaques
        
        if(this.pesquisa.length>=3){
            this.filterDestaques = this.filterDestaques.filter(item => item.name.toLowerCase().includes(this.pesquisa.toLowerCase()));
        }

        if(this.setCategories.length >= 1){
            this.filterDestaques = this.filterDestaques.filter(item => {
                return this.setCategories.some((i)=>{
                    return item.categories.includes(i)
                })
            });
        }
        
    }
  },
    mounted() {
      document.title = "Otaku Stars - Pesquisa";
        this.getDestaques()
        this.getCategories()
    },
  };
  </script>
  
  <style></style>
c  