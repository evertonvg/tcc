<template>
    <div class="flex align-start justify-start mb-8">
        <div class="rounded-full h-24 w-24 overflow-hidden">
            <img :src="photo" class="w-full h-full object-cover" @error="replaceByDefault" />
        </div>
        <div class="ml-4 flex-1 flex flex-col align-start justify-start">
            <div class="text-left">
                <span>
                    {{name}}
                </span>
                <span class="text-white bg-red h-6 p-1 ml-4">
                    {{data}}
                </span>
            </div>
            <div class="text-left rounded border border-black p-4 mt-2">
                {{comment}}
            </div>
        </div>
    </div>
</template>
<script>
import imgDefault from '@/assets/img/default.jpg';
export default {
    props:['comment','photo','data','name'],
    name:'comentarysView',
    methods:{
        replaceByDefault(e){
            e.target.src = imgDefault
        }
    }
}
</script>