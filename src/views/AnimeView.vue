<template>
    <header class="h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        
    </header>
    <section class="container mx-auto mt-4 -translate-y-20">
        <div class="flex items-stretch  justify-center gap-4 ">
            <div class="w-[215px] h-[301px]" v-if="anime!=null">
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
                <div class="absolute bottom-4 left-4 flex gap-2">
                    <span v-for="(cat,ind) in anime.categories" :key="ind" class="border border-black rounded p-1">
                        {{cat}}
                    </span>
                </div>
            </div>
        </div>
        <div class="container h-full mx-auto flex items-start justify-start mt-4">
            <div class="mb-4 flex items-center justify-center gap-3">
                <div class="flex items-start justify-start w-[215px]">
                    <select name="" id="" class="h-10 rounded px-4 outline-none cursor-pointer min-w-full" v-model="temporada">
                        <option value="1">Temporada 1</option>
                        <option value="2">Temporada 2</option>
                        <option value="3">Temporada 3</option>
                        <option value="4">Temporada out blood</option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-5 bg-white rounded px-4">
                    <div class="flex h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <graphic title="animação" fillColor="#E7711B" :size="40"></graphic>
                    </div>
                    <div class="flex h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <history title="historia" fillColor="#E7711B" :size="40"></history>
                    </div>
                    <div class="flex h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <person title="Personagens" fillColor="#E7711B" :size="40"></person>
                    </div>
                    
                    <div class="flex h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <music title="trilha sonora" fillColor="#E7711B" :size="40"></music>
                    </div>
                    
                    <div class="flex h-full items-center justify-center font-bold">
                        <span class="text-star text-3xl
                        ">4.7</span>
                        <star title="nota final da temporada" fillColor="#E7711B" :size="40"></star>
                    </div>
               
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
                    <svg v-for="i in 10" @click="grade.animation=i" :key="i"  class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i<=grade.animation ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">História:</span>
                    <svg v-for="i in 10" @click="grade.history=i" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i<=grade.history ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">Personagens:</span>
                    <svg v-for="i in 10" @click="grade.characters=i" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i<=grade.characters ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <div class="flex items-center justify-start gap-2 mb-4">
                    <span class="w-28 text-left">Trilha sonora:</span>
                    <svg v-for="i in 10" @click="grade.sound=i" :key="i" class="cursor-pointer svg-star"
                        xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
                        <title>Five Pointed Star</title>
                        <path :fill="`${i<=grade.sound ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
                    </svg>
                </div>
                <button class="btn">
                    Enviar
                </button>
            </div>
        </transition>
    </section>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
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