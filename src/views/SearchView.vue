<template>    
    <SearchVue :pesquisa="pesquisa" :categories="categories" :settype="setType" v-on:attSearchEmit="attSearch" v-on:attFilterEmit="attSFilterCategory" v-on:attFilterTypes="attSFilterTypes"  />
    
    <div class="container mx-auto pb-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-5 xl:px-0 relative before:flex before:items-center before:justify-center  before:absolute  before:w-full before:h-full before:top-0 before:left-0">
        <transition name="fade">
            <span class="absolute w-full h-full top-0 left-0 bg-blue z-10 flex items-center justify-center" v-show="load==true">
                <img src="@/assets/img/icon.png" class="animate-pulse" />
            </span>
        </transition>
        
            <router-link  v-for="(destaque,index) in filterDestaques" :key="index" :to="`/animes/${destaque.slug}`" v-show="index < page*limitPage && index >= limitPage*(page -1)" class="sm:h-full relative w-full bg-gradient-to-b from-white to-header h-64">
                <cardVue :item="destaque" class="bg-gradient-to-b from-white to-header" />
            </router-link>
        
    </div>
    
    <p v-show="!filterDestaques.length" class="text-center text-white">Nehhum resultado encontrado</p>

    <PaginateVue v-show="totalPages > 1"  :page="page" :totalpages="totalPages"  v-on:attPageEmit="attPage" />
       
  </template>
  
  <script>
  import cardVue from '@/components/cardVue.vue'
  import PaginateVue from '@/components/SearchView/PaginateVue.vue';
  import SearchVue from '@/components/SearchView/SearchVue.vue'
  import firebase from "firebase";

  export default {
    components: {
        cardVue,
        PaginateVue,
        SearchVue
    },
    data() {
        return {
            destaques:[],
            idDestaques:[],
            filterDestaques:[],
            pesquisa:'',
            categories:[],
            setCategories:[],
            limitPage:12,
            page:1,
            totalPages:0,
            setType:'all',
            mostComments:[],
            mostEvaluations:[],
            load:true
            
        }
    },
    watch:{
        pesquisa(){
            this.setFilter()
            this.page = 1
            this.attTotalPages()
            this.attUrl()
            this.setLoad()
            this.removeLoad()
        },
        setCategories(){
            this.setFilter()
            this.page = 1
            this.attTotalPages()
            this.attUrl()
            this.setLoad()
            this.removeLoad()
        },
        setType(){
            this.setFilter()
            this.page = 1
            this.attTotalPages()
            this.attUrl()
            this.setLoad()
            this.removeLoad()
        },
        page(){
            this.attUrl()
            this.setLoad()
            this.removeLoad()
        }
      
    },
    methods: {
        removeLoad(){
            setTimeout(()=>{
                this.load = false
            },200)
        },
        setLoad(){
            this.load = true
        },
        getComments(){
            let ref = firebase.database().ref('comments');
            ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
                this.mostComments =  []
                snapshot.forEach((ss) => {
                    this.mostComments.push(ss.val());  
                });

                this.filterDestaques.forEach((destaque,ind)=>{

                    let totalcomments = this.mostComments.filter((item)=>{
                        return item.idAnime == this.idDestaques[ind]
                    }).length;
                    destaque.comments = totalcomments
                })
                
                this.destaques.forEach((destaque,ind)=>{

                    let totalcomments = this.mostComments.filter((item)=>{
                        return item.idAnime == this.idDestaques[ind]
                    }).length;
                    destaque.comments = totalcomments
                })
            });

        },
        getEvaluations(){
            let ref = firebase.database().ref('evaluations');
            ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
                this.mostEvaluations = []
                snapshot.forEach((ss) => {
                    this.mostEvaluations.push(ss.val());
                });
                this.filterDestaques.forEach((destaque,ind)=>{

                    let totalvotes = this.mostEvaluations.filter((item)=>{
                        return item.idAnime == this.idDestaques[ind]
                    }).length;
                    destaque.evaluations = totalvotes
                })
                this.destaques.forEach((destaque,ind)=>{

                    let totalvotes = this.mostEvaluations.filter((item)=>{
                        return item.idAnime == this.idDestaques[ind]
                    }).length;
                    destaque.evaluations = totalvotes
                })
            });
        },
        attUrl(){

            this.$router.replace({ 
                path: this.$route.fullPath, query: { 
                    page: this.page,
                    name: this.pesquisa,
                    type:this.setType,
                    categories: this.setCategories.map((item)=>{
                        return item
                    }).toString()
                }})
        },
        attSearch(value){
            this.pesquisa = value
        },
        attSFilterCategory(value){
            this.setCategories = value
        },
        attSFilterTypes(value){
            this.setType = value
        },
        attPage(atP){
            this.page = atP
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        getDestaques(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('active').equalTo(true).on("value",async (snapshot) => {
                this.destaques = []
                this.filterDestaques = []
                this.idDestaques = []
                snapshot.forEach((ss) => {
                    this.destaques.push(ss.val());
                    this.filterDestaques.push(ss.val());
                    this.idDestaques.push(ss.key)
                });
                
                await this.getComments()
                await this.getEvaluations()
                
                await this.setFilter()
                this.attTotalPages()
                this.$store.commit('SET_LOADING',false)
                this.removeLoad()
                
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
        attTotalPages(){
            this.totalPages = this.filterDestaques.length/this.limitPage < 1 ? 0 : this.filterDestaques.length % this.limitPage == 0 ? this.filterDestaques.length / this.limitPage : parseInt(this.filterDestaques.length / this.limitPage) + 1;
        },
        setFilter(){
            
            setTimeout(()=>{
                this.filterDestaques = this.destaques
            
                if(this.pesquisa!=''){
                    this.filterDestaques = this.filterDestaques.filter(item => item.name.toLowerCase().includes(this.pesquisa.toLowerCase()));
                }

                if(this.setCategories.length >= 1){
                    this.filterDestaques = this.filterDestaques.filter(item => {
                        return this.setCategories.some((i)=>{
                            return item.categories.includes(i)
                        })
                    });
                }
                this.filterDestaques = this.filterDestaques.sort((x,y)=>{
                    let a = x.name.toLowerCase()
                    let b = y.name.toLowerCase()
                    return  a == b ? 0 : a > b ? 1 : -1
                })
                if(this.setType!=''){
                    switch(this.setType){
                        case 'newtemps': 
                            this.filterDestaques = this.filterDestaques.filter(item => {
                                return item.newSeason == true
                            });
                        break;
                        case 'launchs': 
                            this.filterDestaques = this.filterDestaques.filter(item => {
                                return item.newAnime == true
                            });
                        break;
                        case 'exibition': 
                            this.filterDestaques = this.filterDestaques.filter(item => {
                                return item.activeSeason == true
                            });
                        break;
                        case 'evaluations':                         
                            this.filterDestaques = this.filterDestaques.sort((x,y)=>{
                                let a = x.evaluations
                                let b = y.evaluations
                                return b-a
                            })
                            console.log(this.filterDestaques)
                        break;
                        case 'comments': 
                            this.filterDestaques = this.filterDestaques.sort((x,y)=>{
                                let a = x.comments
                                let b = y.comments
                                return b-a
                            })
                            console.log(this.filterDestaques)
                        break;
                        default:
                            this.filterDestaques = this.filterDestaques.sort((x,y)=>{
                                let a = x.name.toLowerCase()
                                let b = y.name.toLowerCase()
                                return  a == b ? 0 : a > b ? 1 : -1
                            })
    
                    }
                }
            },200)
            
        }
    },
    mounted() {
      document.title = "Otaku Stars - Pesquisa";
        this.getDestaques()
        this.getCategories()
        
        if(this.$route.query.page){
            this.page=this.$route.query.page
        }
        if(this.$route.query.name){
            this.pesquisa=this.$route.query.name
            this.attSearch(this.$route.query.name)
        }
        if(this.$route.query.type){
            this.setType = this.$route.query.type
        }
        
        
    },
  };
  </script>
  
  <style></style>
c  