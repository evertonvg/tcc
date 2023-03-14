<template>
    <div class="relative h-full">
        <!-- <div class="absolute top-1 right-1 flex flex-col items-center justify-center z-30 bg-lightblue p-1 " >
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
            <span class="text-black font-black text-2xl">7.4</span>
        </div> -->
        <img :src="item.image" class="w-full h-full object-cover" @error="setAltImg" alt=example/>
        <div v-if="item.activeSeason" class="w-full h-8 flex justify-center items-center bg-red text-white absolute top-3/4 left-0 font-bold uppercase text-2xl">
            Em exibição
        </div>
        <div v-if="item.newAnime" class="w-full h-8 flex justify-center items-center bg-green text-white absolute top-3/4 left-0 font-bold uppercase text-2xl">
            Novo anime
        </div>
        <div v-if="item.newSeason" class=" w-full h-8 flex justify-center items-center bg-darkblue text-white absolute top-3/4 left-0 font-bold uppercase text-xs">
            Nova temporada em breve
        </div>
        <div class="absolute bottom-0 left-0 bg-black/50 w-full p-2  text-left">
            <h3 class="text-sm text-white">
                <span class="opacity-100">
                {{item.name}}
                </span>
            </h3>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    methods:{
        setAltImg(event) { 
            event.target.src = "icon.png"
        }
    }
}
</script>

<style>

</style>