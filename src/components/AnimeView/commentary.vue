<template>
    <div class="flex align-start justify-start mb-8">
        <div class="rounded-full h-24 w-24 overflow-hidden">
            <img :src="photo" class="w-full h-full object-cover" @error="replaceByDefault" />
        </div>
        <div class="ml-4 flex-1 flex flex-col align-start justify-start group">
            <div class="text-left flex items-center justify-start">
                <span>
                    {{name}}
                </span>
                <span class="text-white bg-red h-6 p-1 pb-6 ml-4">
                    {{data}}
                </span>
                <button @click="event" :data-id="id" :data-text="comment" class="cursor-pointer ml-3 block lg:hidden group-hover:block">
                    <alert size="24" title="reportar comentário" :data-id="id" :data-text="comment"  fillColor="#AC3D54"  />
                </button>
                <!-- <button   @click="eventDelete" :data-id="id" :data-text="comment" class="cursor-pointer ml-3 block lg:hidden group-hover:block">
                    {{$cookies.get('loginIdAnime')}} <br>
                    {{ iduser }}
                    
                    <delete size="24" title="reportar comentário" :data-user="iduser" :data-id="id" :data-text="comment"  fillColor="#1CD9B8"  />
                </button> -->
            </div>
            <div class="text-left rounded border border-black p-4 mt-2 ">
                {{comment}}
            </div>
        </div>
    </div>
    

</template>
<script>
import imgDefault from '@/assets/img/default.jpg';
export default {
    props:['comment','photo','data','name','id','report','idReport','reportComent','iduser'],
    name:'comentarysView',
    emits: ['update:report','update:idReport','update:reportComent'],
    methods:{
        replaceByDefault(e){
            e.target.src = imgDefault
        },
        event(ev){
            this.$emit('update:report', !this.report); 
            this.$emit('update:idReport', ev.currentTarget.dataset.id)
            this.$emit('update:reportComent', ev.currentTarget.dataset.text)
        },
        eventDelete(ev){
            console.log(ev.currentTarget.dataset.user)
        }
    },

    
}
</script>