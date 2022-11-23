<template>
    <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 flex items-center justify-center">
        <div class="flex flex-col max-w-[90%] w-[960px] gap-5" @click.stop> 
            <select v-model="video" class="w-full p-4 cursor-pointer outline-none text-graytext">
                <option value="" selected disabled>Por favor, selecione uma opening ou ending para visualizar</option>
                <option v-for="(video,index) in videos" :key="index" class="cursor-pointer hover:bg-star" :value="video.link">{{video.name}}</option>
                
            </select>
            <iframe class="w-full h-[500px] bg-header"  height="315" :src="video" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    </div>
</template>
<script>
export default {
    props:['videos'],
    name:'musicFrame',
}
</script>