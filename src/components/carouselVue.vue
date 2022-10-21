<template>
    <h2 class="text-left text-2xl font-bold pt-6 my-4">{{title}}</h2>
    <carousel :settings="settings" :breakpoints="breakpoints">
        <slide v-for="(item,index) in items" :key="index">
            <div class="w-full h-80 px-2">
                <router-link :to="`/anime/${item.name.toString().toLowerCase().replaceAll(' ','-')}`" class="h-full relative w-full">
                    <!-- <div class="star-ratings absolute top-2 right-2"> -->
                        <!-- <div class="fill-ratings absolute top-0 right-0 z-10">
                            <span class="w-9 h-9 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-star to-gray ">★</span>
                        </div> -->
                        <!-- <div class="empty-ratings absolute top-0 right-0">
                            <span class="w-9 h-9 text-6xl">★</span>
                        </div> -->
                        
                    <!-- </div> -->
                    <div class="absolute top-1 right-1 flex flex-col items-center justify-center z-30 bg-lightblue p-1">
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

                    </div>
                    <img :src="item.image" class="w-full h-full object-cover" alt=example/>
                    <div class="absolute bottom-0 -left-full bg-black/50 w-[200%] p-2  text-left">
                        <h3 class="text-sm text-white">
                            <span class="opacity-100">
                            {{item.name}}
                            </span>
                        </h3>
                    </div>
                </router-link>
            </div>
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
    <router-link :to="link" class="float-right block btn">
        Ver todos
    </router-link>
</template>
<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
    name:'carousel-component',
    props:['items','title','link'],
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        
    },
    data() {
        return {
            settings: {
                itemsToShow: 1,
                snapAlign: 'center',
                autoplay:"10000"
            },
            
            breakpoints: {
                700: {
                    itemsToShow: 3.5,
                    snapAlign: 'center',
                },
                // 1024 and up
                1024: {
                    itemsToShow: 5,
                    snapAlign: 'start',
                },
            },
        }
    },
}
</script>
<style lang="postcss">
.carousel__prev--in-active, .carousel__next--in-active{
  @apply hidden;
}
</style>