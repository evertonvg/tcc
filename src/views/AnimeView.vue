<template>
    <header class="h-[30vh] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        
    </header>
    <section class="px-5 container mx-auto mt-4 -translate-y-20">
        <div class="flex flex-col sm:flex-row  items-stretch  justify-center gap-4 ">
            <div class="w-[215px] h-[301px] mx-auto" v-if="anime!=null">
                <img :src="anime.image" :alt="anime.name" class="w-full h-full object-fill" />
            </div>
            <div class="flex-1 bg-white rounded p-4 flex flex-col" v-if="anime!=null">
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
                <div class="flex flex-1 gap-2 flex-wrap mt-5 items-end">
                    <span v-for="(cat,ind) in anime.categories" :key="ind" class="border border-black rounded p-1 h-8">
                        {{cat}}
                    </span>
                </div>
            </div>
        </div>
        <div class="container h-full mx-auto flex items-start justify-start mt-4" v-show="seasons.length">
            <div class="mb-4 flex items-center justify-center gap-4 w-full flex-col sm:flex-row">
                <div class="flex items-start justify-start w-full sm:w-[215px]">
                    <select v-model="temporada" class="h-10 rounded px-4 outline-none cursor-pointer min-w-full text-graytext" @change="setVideos">
                        <option v-for="(season,index) in seasons" :key="index" :value="season.order">{{season.name}}</option>
                    </select>
                </div>

                <transition-group name="fade">
                    <div class="flex items-center justify-center gap-5 sm:gap-1 lg:gap-5 bg-white rounded px-4" v-for="(season,index) in seasons" :key="index" v-show="temporada == season.order">
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
                 </transition-group>
                <div class="flex-1 rounded h-full w-full flex items-center justify-center sm:items-end sm:justify-end" >
                    <play fillColor="#E7711B" :size="40" title="aba de videos" class="cursor-pointer bg-white" v-show="videos!=undefined" @click="modalMusic=true"/>
                </div>
            </div>
            
        </div>



        <!-- dados de temporada  -->
        <transition-group tag="div" name="fade">
            <div class="rounded flex flex-col sm:flex-row justify-center gap-4" v-for="(season,index) in seasons" :key="index" v-show="temporada == season.order">
                <div class="w-full sm:w-[215px] bg-white p-4">
                    <ul class="flex flex-col items-start justify-start gap-3">
                        <li class="flex flex-col items-start justify-start">
                            <span class="font-semibold">
                                Autor
                            </span>
                            <span>
                                {{season.author}}
                            </span>
                        </li>
                        <li class="flex flex-col items-start justify-start">
                            <span class="font-semibold">
                                lançamento
                            </span>
                            <span>
                                {{formatted(season.launch)}}
                            </span>
                        </li>
                        <li class="flex flex-col items-start justify-start">
                            <span class="font-semibold">
                                Número de episódios 
                            </span>
                            <span>
                                {{season.numberEpisodes}} 
                            </span>
                        </li>
                        <li class="flex flex-col items-start justify-start">
                            <span class="font-semibold">
                                Estúdio
                            </span>
                            <span>
                                {{season.studio}}
                            </span>
                        </li>
                        <li class="flex flex-col items-start justify-start">
                            <span class="font-semibold">
                                Status
                            </span>
                            <span>
                                {{season.status}}
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- avaliações e comentarios  -->
                
                <div class="flex-1 bg-white p-4">
                    <div v-show="$cookies.get('loginIdAnime') == null" class="font-bold">
                        Para Fazer avaliações e comentários você deve fazer <router-link to="/login" :class="[`bg-red rounded-sm p-2 text-white`]">Login</router-link>
                    </div>
                    <div v-show="$cookies.get('loginIdAnime') != null">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Faça suas avaliações
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
                        <div class="text-left">
                            <button class="btn">
                                Enviar Avaliação
                            </button>
                        </div>
                    </div>
                    <div class="mt-12" v-show="$cookies.get('loginIdAnime') != null">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Deixe seu comentário
                        </h2>
                        <textarea class="border border-black rounded w-full h-40 p-4" placeholder="escreva seu comentário..."></textarea>
                        <div class="text-left">
                            <button class="btn">
                                Postar Comentário
                            </button>
                        </div>
                    </div>
                    <div class="mt-12">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Confira outros comentários
                        </h2>
                        <div class="flex align-start justify-start mb-8">
                            <div class="rounded-full h-24 w-24 overflow-hidden">
                                <img :src="$cookies.get('imageAnime')" class="w-full h-full object-cover" />
                            </div>
                            <div class="ml-4 flex-1 flex flex-col align-start justify-start">
                                <div class="text-left">
                                    <span>
                                        {{$cookies.get("nameAnime")}}
                                    </span>
                                    <span class="text-white bg-red h-6 p-1 ml-4">
                                        {{formatted('2021-12-02 12:12:12')}}
                                    </span>
                                </div>
                                <div class="text-left rounded border border-black p-4 mt-2">
                                    
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt quisquam qui, voluptatum aliquam accusamus voluptate reiciendis voluptates quo necessitatibus, molestias autem nostrum ab tempore. Molestias porro itaque repudiandae quidem earum?
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolores, quo dolor, quasi minus illum cumque aperiam animi aliquam repellendus eaque porro esse laborum adipisci quibusdam. Possimus eaque consectetur repellendus!
                                </div>
                            </div>
                        </div>
                        <div class="flex align-start justify-start">
                            <div class="rounded-full h-24 w-24 overflow-hidden">
                                <img :src="$cookies.get('imageAnime')" class="w-full h-full object-cover" />
                            </div>
                            <div class="ml-4 flex-1 flex flex-col align-start justify-start">
                                <div class="text-left">
                                    <span>
                                        {{$cookies.get("nameAnime")}}
                                    </span>
                                    <span class="text-white bg-red h-6 p-1 ml-4">
                                        {{formatted('2021-12-02 12:12:12')}}
                                    </span>
                                </div>
                                <div class="text-left rounded border border-black p-4 mt-2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolores, quo dolor, quasi minus illum cumque aperiam animi aliquam repellendus eaque porro esse laborum adipisci quibusdam. Possimus eaque consectetur repellendus!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition-group>
    </section>
    <transition name="fade">
        <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 flex items-center justify-center" v-if="modalMusic" @click="modalMusic=false">
            <div class="flex flex-col max-w-[90%] w-[960px] gap-5" @click.stop> 
                <select v-model="video" class="w-full p-4 cursor-pointer outline-none text-graytext">
                    <option value="" selected disabled>Por favor, selecione uma opening ou ending para visualizar</option>
                    <option v-for="(video,index) in videos" :key="index" class="cursor-pointer hover:bg-star" :value="video.link">{{video.name}}</option>
                    
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
import {  useDateFormat } from '@vueuse/core'
export default {
    setup(){
        const formatted = (data) =>{
            return useDateFormat(data, 'MM/YYYY');
        } 
        return {formatted}
    },
    data() {
        return {
            modalMusic:false,
            video:'',
            anime: null,
            temporada:1,
            idAnime:'',
            seasons:[],
            idSeasons:[],
            videos:[],
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
                this.idAnime = ''
                snapshot.forEach((ss) => {
                    this.anime = ss.val();
                    this.idAnime = ss.key
                });
                if(this.anime.imageBanner){
                    this.$refs.banner.style.backgroundImage = `url(${this.anime.imageBanner})`
                }
                this.getSeasons(this.idAnime)
                this.$store.commit('SET_LOADING',false)
            });
        },
        setVideos(ev){
            let seas = this.seasons.filter((season)=>{
                return season.order == ev.target.value;
            })
            
            this.videos = seas[0].videos
            console.log(this.videos)
        },
        getSeasons(id){
            let ref = firebase.database().ref('seasons');
            ref.orderByChild('idAnime').equalTo(id).on("value", (snapshot) => {
                this.seasons =  [];
                this.idSeasons = [];
                snapshot.forEach((ss) => {
                    this.idSeasons.push(ss.key)
                    this.seasons.push(ss.val())
                });
                console.log(this.seasons);
                
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