<template>
    <div class="flex flex-col sm:flex-row  items-stretch  justify-center gap-4 ">
        <div class="w-[215px] h-[301px] mx-auto" v-if="anime!=null">
            <img :src="anime.image" :alt="anime.name" class="w-full h-full object-fill" />
        </div>
        <div class="flex-1 bg-white rounded p-4 flex flex-col relative mt-14 sm:mt-0" v-if="anime!=null">
            <div class="absolute -top-12 right-0 cursor-pointer flex items-center justify-center gap-1 btn" @click="emitFavorite" v-if="$cookies.get('loginIdAnime') != null && showfavorite">
                <span v-if="!favorite">
                    Adicionar aos favoritos
                </span>
                <span v-else>
                    Remover dos favoritos
                </span>
                <heart :size="30" :fillColor="favorite ? '#FF0000' : '#5C728A'" />
            </div>
            <h1 class="font-semibold text-3xl text-graytext mb-2 flex flex-col items-start justify-between">
                <span>{{anime.name}} </span>
                <span class="text-xs text-blue">{{ anime.englishName }} </span>
                <span class="text-xs text-lightblue">{{ anime.portugueseName }} </span>
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
</template>
<script>
export default {
    props:['anime','finalnote','favorite','showfavorite','changeFavorite'],
    emits: ['update:favorite'],
    name:'animeView',
 
    computed:{
        seasonnote(){
            return parseInt((this.finalnote.finalNote * 100) / 10)
        }
    },
    methods:{
            emitFavorite(){
                this.$emit('update:favorite', !this.favorite)
                this.changeFavorite()
            }
        }
}
</script>