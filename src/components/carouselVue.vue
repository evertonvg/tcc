<template>
    <h2 class="text-left text-2xl font-bold pt-6 my-4">{{title}}</h2>
    <carousel :settings="settings" :breakpoints="breakpoints" v-if="items.length">
        <slide v-for="(item,index) in items.slice(0, 10)" :key="index">
            <div class="w-full h-80 px-2">
                <router-link :to="`/animes/${item.slug}`"  class="h-full relative w-full bg-gradient-to-b from-white to-header" :data-link="`/animes/${item.slug}`" @click="reload">
                    <cardVue :item="item" class="bg-gradient-to-b from-white to-header" />
                </router-link>
            </div>
        </slide>

        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
    <router-link :to="link" class="float-right block btn" v-show="link">
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
                itemsToShow: 1.5,
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
                1440: {
                    itemsToShow: 6,
                    snapAlign: 'start',
                },
            },
        }
    },
    methods:{
            gopage(ev){
                window.location.href = ev.target.dataset.link
            },
            reload(){
                if(this.$route.fullPath.includes('animes')){
                    setTimeout(()=>{
                        window.location.reload()
                    },100)
                }
            }
        }
}
</script>
<style lang="postcss">
.carousel__prev--in-active, .carousel__next--in-active{
  @apply hidden;
}
.carousel__prev,.carousel__next{
    @apply bg-blue transition-all;
}
.carousel__prev:hover,.carousel__next:hover{
    @apply bg-darkblue;
}
.carousel__pagination-button{
    @apply bg-blue;
}
.carousel__pagination-button--active{
    @apply bg-darkblue;
}
</style>