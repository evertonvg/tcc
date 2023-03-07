<template>
    <header class="h-[30vh] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner"></header>
    <section class="px-5 container mx-auto mt-4 -translate-y-20">
        <infosView :anime="anime"/>
        <div class="container h-full mx-auto flex items-start justify-start mt-4" v-show="seasons.length">
            <div class="mb-4 flex items-center justify-center gap-4 w-full flex-col sm:flex-row">
                <div class="flex items-start justify-start w-full sm:w-[215px]">
                    
                    <select v-model="temporada" class="h-10 rounded px-4 outline-none cursor-pointer min-w-full text-graytext" @change="()=>{setVideos,type=temporada}">
                        <optgroup label="Temporadas" class="font-bold">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='Temporada'" >{{season.name}}</option>
                        </optgroup>
                        <optgroup label="Filmes" class="font-bold">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='Filme'" >{{season.name}}</option>
                        </optgroup>
                        <optgroup label="OVAS" class="font-bold">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='OVA'" >{{season.name}}</option>
                        </optgroup>
                    </select>
                </div>
                <transition-group name="fade">
                    <notesView v-for="(season,index) in seasons" :key="index" v-show="temporada == season.order" />
                 </transition-group>
                <div class="flex-1 rounded h-full w-full flex items-center justify-center sm:items-end sm:justify-end" >
                    <play fillColor="#E7711B" :size="40" title="aba de videos" class="cursor-pointer bg-white" v-show="videos!=undefined" @click="modalMusic=true"/>
                </div>
                
            </div>    
        </div>

        <!-- dados de temporada  -->
        <transition-group tag="div" name="fade">
            <div class="rounded flex flex-col sm:flex-row justify-center gap-4" v-for="(season,index) in seasons" :key="index" v-show="temporada == season.order">
                <!-- informações da temporada  -->
                <seasoninfoView :season="season" :timeFormat="formatted(season.launch)" />

                <!-- avaliações e comentarios  -->
                <div class="flex-1 bg-white p-4">
                    <div class="mb-12">
                        <h2 class="text-left mb-8 text-xl font-bold">Descrição da temporada/filme/OVA</h2>s
                        <p class="text-left">
                            {{season.description  }}
                        </p>
                    </div>
                    <div v-show="$cookies.get('loginIdAnime') == null" class="font-bold">
                        Para Fazer avaliações e comentários você deve fazer <router-link to="/login" :class="[`bg-red rounded-sm p-2 text-white`]">Login</router-link>
                    </div>
                    <div v-show="$cookies.get('loginIdAnime') != null">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Faça suas avaliações
                        </h2>
                        <evaluatestarView v-model:grade="grade.animation"  name="Animação:" />
                        <evaluatestarView v-model:grade="grade.history"  name="História:" />
                        <evaluatestarView v-model:grade="grade.characters"  name="Personagens:" />
                        <evaluatestarView v-model:grade="grade.sound" name="Trilha sonora:" />

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
                        <commentaryView comment="lorem ipsum" :photo="$cookies.get('imageAnime')" :data="formatted('2021-12-02 12:12:12')" :name="$cookies.get('nameAnime')" />
                        <commentaryView comment="lorem ipsum" :photo="$cookies.get('imageAnime')" :data="formatted('2021-12-02 12:12:12')" :name="$cookies.get('nameAnime')" />
                    </div>
                </div>
            </div>
        </transition-group>
    </section>
    <transition name="fade">
        <musicModal @click="modalMusic=false" v-if="modalMusic" :videos="videos" />
    </transition>
</template>

<script>
import musicModal from '@/components/AnimeView/music.vue';
import infosView from '@/components/AnimeView/infos.vue';
import notesView from '@/components/AnimeView/notes.vue';
import seasoninfoView from '@/components/AnimeView/seasoninfos.vue';
import commentaryView from '@/components/AnimeView/commentary.vue';
import evaluatestarView from '@/components/AnimeView/evaluatestar.vue';
import firebase from "firebase";
import {  useDateFormat } from '@vueuse/core';
export default {
    setup(){
        const formatted = (data) =>{
            return useDateFormat(data, 'MM/YYYY');
        } 
        return {formatted}
    },
    components:{
        musicModal,
        infosView,
        notesView,
        seasoninfoView,
        commentaryView,
        evaluatestarView
    },
    data() {
        return {
            type:"",
            modalMusic:false,
            video:'',
            anime: null,
            temporada:1,
            idAnime:'',
            seasons:[],
            idSeasons:[],
            videos:[],
            evaluations:[],
            idEvaluations:[],
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
        },
        
    },
    methods:{
        emitStar(ev){
            console.log(ev)
        },
        getAnime(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                this.anime =  []
                this.idAnime = ''
                this.evaluations =  []
                this.idEvaluations = []
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
                    this.getEvaluations(ss.key)
                });
                this.videos  = this.seasons[0].videos;
            });
        },
        getEvaluations(id){
            let ref = firebase.database().ref('evaluations');
            ref.orderByChild('seasonId').equalTo(id).on("value", (snapshot) => {
                snapshot.forEach((ss) => {
                    this.evaluations.push(ss.val());
                    this.idEvaluations.push(ss.key);
                });
            });
        },
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