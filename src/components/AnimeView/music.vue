<template>
    <div class="fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 flex items-center justify-center">
        <div class="flex flex-col max-w-[90%] w-[960px] gap-5" @click.stop> 
            <select v-model="video" class="w-full p-4 cursor-pointer outline-none text-graytext">
                <option selected disabled>Por favor, selecione uma opening ou ending para visualizar</option>
                <option v-for="(video,index) in videosList" :key="index" class="cursor-pointer hover:bg-star" :value="video.link">{{video.name}}</option>
                
            </select>
            <iframe class="w-full h-[500px] bg-header"  height="315" :src="`https://www.youtube.com/embed/${video ? video.replace(regex,'$1') : 'undefined'}`" 
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
    data(){
        return{
            video:'',
            videosList:'',
            regex:/https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig
        }
    },
    watch:{
        video(){
            this.$emit('musicEmit',this.videosList)
        }
    },
    mounted(){
        this.videosList = this.videos
    }
}
</script>