<template>
    <h2 class="text-left text-2xl font-bold pt-6 my-4">{{title}}</h2>
    <carousel :settings="settings" :breakpoints="breakpoints" v-if="items.length">
        <slide v-for="(item,index) in items" :key="index">
            <div class="w-full h-80 px-2">
                <router-link :to="`/anime/${item.name.toString().toLowerCase().replaceAll(' ','-')}`" class="h-full relative w-full">
                    <cardVue :item="item" />
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
import cardVue from '@/components/cardVue.vue'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
    name:'carousel-component',
    props:['items','title','link'],
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        cardVue
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