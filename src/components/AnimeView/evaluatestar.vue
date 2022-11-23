<template>
    <div class="flex items-center justify-start gap-2 mb-4">
        <span class="w-28 text-left">{{name}}</span>
        <svg v-for="i in 5" @click="localGrade=i+5"  :data-star="i" :data-property="i"  :key="i"  class="cursor-pointer svg-star"
            xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 51 48">
            <title>Five Pointed Star</title>
            <path :fill="`${i+5<=grade ? '#E7711B' : 'none' }`"  stroke="#E7711B" d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
        </svg>
    </div>
</template>
<script>
export default {
    props:['grade','name'],
    name:'evaluatestarView',
    data() {
        return{
            localGrade:''
        }
    },
    methods:{
        changeValueStar(ev){
            this.$emit('change-star',parseInt(ev.target.dataset.star) + 5,);
        }
    },
    watch:{
        localGrade(newValue){
            this.$emit('update:grade',newValue);
        }
    },
    created(){
        this.localGrade = this.grade;
    }

}
</script>