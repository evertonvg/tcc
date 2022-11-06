<template>
    <header class="h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        
    </header>
    <section class="container mx-auto mt-4">
        <div class="flex items-start  justify-center gap-4">
            <div class="w-[215px] h-[301px]" v-if="anime!=null">
                <img :src="anime.image" :alt="anime.name" class="w-full h-full object-fill -translate-y-20" />
            </div>
            <div class="flex-1 bg-white rounded p-4 min-h-[221px]" v-if="anime!=null">
                <h1 class="text-left font-semibold text-3xl text-graytext mb-2">{{anime.name}}</h1>
                <p class="text-left text-graytext">
                    {{anime.description}}
                </p>
            </div>
        </div>
        <div class="container h-full mx-auto flex items-start justify-start">
            <div class="mb-4 flex items-center justify-center gap-3">
                <div class="flex items-start justify-start w-full">
                    <select name="" id="" class="h-10 rounded px-4 outline-none cursor-pointer min-w-[300px]" v-model="temporada">
                        <option value="1">Temporada 1</option>
                        <option value="2">Temporada 2</option>
                        <option value="3">Temporada 3</option>
                        <option value="4">Temporada out blood</option>
                    </select>
                </div>
                <div class="flex items-center justify-center gap-5">
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
        <transition-group tag="div" name="fade">
            <div v-if="temporada==1">
                star1
            </div>
            <div v-if="temporada==2">
                star2
            </div>
        </transition-group>
    </section>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            anime: null,
            temporada:1
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
    .shadow-gradient{
        background: linear-gradient(180deg,rgba(var(--color-shadow-dark),0) 40%,rgba(var(--color-shadow-dark),.6));
    }
</style>