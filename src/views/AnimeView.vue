<template>
    <header class="h-[30vh] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        
    </header>
    <section class="container mx-auto mt-4 -translate-y-20">
        <div class="flex flex-col sm:flex-row  items-stretch  justify-center gap-4 ">
            <div class="w-[215px] h-[301px] mx-auto" v-if="anime!=null">
                <img :src="anime.image" :alt="anime.name" class="w-full h-full object-fill" />
            </div>
            <div class="flex-1 bg-white rounded p-4 pb-16 relative" v-if="anime!=null">
                <h1 class="font-semibold text-3xl text-graytext mb-2 flex items-center justify-between">
                    {{anime.name}} 
                    <span class="flex text-star text-3xl">
                        7.7
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="40px" viewBox="0 0 32 32">
                            <defs>
                            <linearGradient id="grad">
                                <stop offset="75%" stop-color="#E7711B"/>
                                <stop offset="50%" stop-color="grey"/>
                            </linearGradient>
                            </defs>
                            <path fill="url(#grad)" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
                            l11.547-1.2L16.026,0.6L20.388,10.918z"/>
                        </svg>

                    </span>
                </h1>
                <p class="text-left text-graytext relative">
                    {{anime.description}}
                    
                </p>
                <div class="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                    <span v-for="(cat,ind) in anime.categories" :key="ind" class="border border-black rounded p-1">
                        {{cat}}
                    </span>
                </div>
            </div>
        </div>
        <div class="container h-full mx-auto flex items-start justify-start mt-4">
            <div class="mb-4 flex items-center justify-center gap-4 w-full flex-col sm:flex-row">
                <div class="flex items-start justify-start w-full sm:w-[215px]">
                    <select name="" id="" class="h-10 rounded px-4 outline-none cursor-pointer min-w-full text-graytext" v-model="temporada">
                        <option value="1">Temporada 1</option>
                        <option value="2">Temporada 2</option>
                        <option value="3">Temporada 3</option>
                        <option value="4">Temporada out blood</option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-5 sm:gap-1 lg:gap-5 bg-white rounded px-4">
                    <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <graphic title="animação" fillColor="#E7711B" :size="40"></graphic>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <history title="historia" fillColor="#E7711B" :size="40"></history>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <person title="Personagens" fillColor="#E7711B" :size="40"></person>
                    </div>
                    
                    <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <music title="trilha sonora" fillColor="#E7711B" :size="40"></music>
                    </div>
                    
                    <div class="flex flex-col-reverse sm:flex-row h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <star title="nota final da temporada" fillColor="#E7711B" :size="40"></star>
                    </div>
               
                </div>
                <div class="flex-1 rounded  px-4 h-full w-full flex items-center justify-center sm:items-end sm:justify-end">
                    <play fillColor="#E7711B" :size="40" title="aba de videos" class="cursor-pointer bg-white" @click="modalMusic=true"/>
                </div>
            </div>
            
        </div>
        <transition tag="div" name="fade" class="">
            <div class="bg-white rounded p-4">
                <h2 class="text-left mb-8 text-xl">
                    Faça suas avaliações e confira comentários de outros usuários sobre a temporada selecionada
                </h2>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">Animação:</span>
                    <svg v-for="i in 5" @click="grade.animation=i+5" :key="i"  class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i+5<=grade.animation ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">História:</span>
                    <svg v-for="i in 5" @click="grade.history=i+5" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i+5<=grade.history ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">Personagens:</span>
                    <svg v-for="i in 5" @click="grade.characters=i+5" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i+5<=grade.characters ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">Trilha sonora:</span>
                    <svg v-for="i in 5" @click="grade.sound=i+5" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i+5<=grade.sound ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <button class="btn">
                    Enviar
                </button>
            </div>
        </transition>
    </section>
    <transition name="fade">
        <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 flex items-center justify-center" v-if="modalMusic" @click="modalMusic=false">
            <div class="flex flex-col max-w-[90%] w-[960px] gap-5" @click.stop> 
                <select v-model="video" class="w-full p-4 cursor-pointer outline-none text-graytext">
                    <option value="" selected disabled>Por favor, selecione uma opening ou ending para visualizar</option>
                    <option class="cursor-pointer hover:bg-star" value="https://www.youtube.com/embed/mFNFmnYio90">op1</option>
                    <option class="cursor-pointer" value="https://www.youtube.com/embed/wiJO_OgsyPE&list=PLWGyVWslwTRiOTC8hCEnSElK96OhHRPEc&index=2&ab_channel=Vaundy-Topic">op1</option>
                    <option class="cursor-pointer" value="https://www.youtube.com/embed/FUgH2zd2Nxo&list=PLWGyVWslwTRiOTC8hCEnSElK96OhHRPEc&index=4&ab_channel=Ado-Topic">op1</option>
                    <option class="cursor-pointer" value="https://www.youtube.com/embed/mFNFmnYio90&list=PLWGyVWslwTRiOTC8hCEnSElK96OhHRPEc&index=8&ab_channel=UNISONSQUAREGARDEN-Topic">end1</option>
                </select>
                <iframe class="w-full h-[500px] bg-header"  height="315" :src="video" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    </transition>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            modalMusic:false,
            video:'',
            anime: null,
            temporada:1,
            grade:{
                animation:0,
                sound:0,
                characters:0,
                history:0
            }
        }
    },
    watch:{
        modalMusic(newer){
            if(newer){
                document.body.style.overflow = 'hidden';
            }else{
                document.body.style.overflow = 'auto'
            }
        }
    },
    methods:{
        getAnime(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                this.anime =  []
                snapshot.forEach((ss) => {
                    this.anime = ss.val();
                });
                if(this.anime.imageBanner){
                    this.$refs.banner.style.backgroundImage = `url(${this.anime.imageBanner})`
                }
                this.$store.commit('SET_LOADING',false)
            });
        }
    },
    mounted() {
        document.title = "Otaku Stars - Inicio";
        this.getAnime()
        window.addEventListener('keydown',(ev)=>{
            switch(ev.key){
                case 'Escape': this.modalMusic = false
            }
        })
    },
}
</script>

<style>
    .svg-star {
        fill:none;
    }
    .svg-star:hover{
        fill:#E7711B;
    }
</style>