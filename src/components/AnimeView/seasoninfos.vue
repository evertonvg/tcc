<template>
    <div class="w-full sm:w-[215px] bg-white p-4">
        <ul class="flex flex-col items-start justify-start gap-3">
            <li class="flex flex-col items-start justify-start" v-show="season.author">
                <span class="font-semibold" >
                    Autor
                </span>
                <span>
                    {{season.author}}
                </span>
            </li>
            <li class="flex flex-col items-start justify-start" v-show="timeFormat">
                <span class="font-semibold">
                    Lançamento
                </span>
                <span>
                    {{timeFormat}}
                </span>
            </li>
            <li class="flex flex-col items-start justify-start" v-show="season.numberEpisodes">
                <span class="font-semibold">
                    Número de episódios 
                </span>
                <span>
                    {{season.numberEpisodes}} 
                </span>
            </li>
            <li class="flex flex-col items-start justify-start" v-show="season.studio">
                <span class="font-semibold">
                    Estúdio
                </span>
                <span>
                    {{season.studio}}
                </span>
            </li>
            <li class="flex flex-col items-start justify-start" v-show="season.status">
                <span class="font-semibold">
                    Status
                </span>
                <span>
                    {{season.status}}
                </span>
            </li>
        </ul>
    </div>
       
</template>
<script>
export default {
    props:['season','timeFormat'],
    name:'seasoninfoView',
}
</script>