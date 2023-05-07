<template>
    
    <div class="grid grid-cols-3 sm:grid-cols-5 gap-5  bg-white rounded px-4">
        <div class="flex flex-col-reverse lg:flex-row h-full items-center justify-center font-bold col-start-1 col-end-2 row-start-1 row-end-2 sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-2">
            
            <graphic title="animação" fillColor="#E7711B" :size="40"></graphic>
            <span class="text-star text-3xl ml-2
            ">{{ notes.animation }}</span>
        </div>
   
        <div class="flex flex-col-reverse lg:flex-row h-full items-center justify-center font-bold col-start-2 col-end-3 row-start-1 row-end-2 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2">
            
            <history title="historia" fillColor="#E7711B" :size="40"></history>
            <span class="text-star text-3xl ml-2
            ">{{ notes.history }}</span>
        </div>

        <div class="flex flex-col-reverse lg:flex-row h-full items-center justify-center font-bold col-start-1 col-end-2 row-start-2 row-end-3 sm:col-start-3 sm:col-end-4 sm:row-start-1 sm:row-end-2">
            <person title="Personagens" fillColor="#E7711B" :size="40"></person>
            <span class="text-star text-3xl ml-2
            ">{{ notes.characters }}</span>
        </div>

        <div class="flex flex-col-reverse lg:flex-row h-full items-center justify-center font-bold col-start-2 col-end-3 row-start-2 row-end-3 sm:col-start-4 sm:col-end-5 sm:row-start-1 sm:row-end-2">
            <music title="trilha sonora" fillColor="#E7711B" :size="40"></music>
            <span class="text-star text-3xl ml-2
            ">{{ notes.sound }}</span>
        </div>
 

        
        <div class="flex flex-col-reverse lg:flex-row h-full items-center justify-center font-bold col-start-3 col-end-4 row-start-1 row-end-3 sm:col-start-5 sm:col-end-6 sm:row-start-1 sm:row-end-2">
            <span class="flex flex-col-reverse lg:flex-row items-center justify-center md:justify-center text-star text-3xl h-full mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="44px" height="34px" viewBox="0 0 32 32">
                    <defs>
                        <linearGradient id="grad">
                            <stop :offset="seasonnote+'%'" stop-color="#E7711B"/>
                            <stop offset="50%" stop-color="grey"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#grad)" d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
                    l11.547-1.2L16.026,0.6L20.388,10.918z"/>
                </svg>
                <span class="ml-2">
                    {{ parseFloat(notes.finalNote).toFixed(2) }}
                </span>
                
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props:['videos','notes'],
    name:'notesView',
    computed:{
        seasonnote(){
            return parseInt((this.notes.finalNote * 100) / 10)
        }
    },
}
</script>