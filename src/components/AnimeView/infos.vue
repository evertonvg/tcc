<template>
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
</template>
<script>
export default {
    props:['anime'],
    name:'animeView',
}
</script>