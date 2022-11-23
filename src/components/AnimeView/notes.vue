<template>
    <div class="flex items-center justify-center gap-5 sm:gap-1 lg:gap-5 bg-white rounded px-4">
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
</template>
<script>
export default {
    props:['videos'],
    name:'notesView',
}
</script>