<template>
    <nav aria-label="Page navigation example">
        <ul class="inline-flex items-center -space-x-px">
            <li v-show="page>1" @click="prevpage">
                <a href="javascript:void(0);" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white transition-all hover:bg-gray border border-gray-300 rounded-l-lg ">
                    <span class="sr-only">Previous</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
            <li v-for="tp in totalpages" :key="tp" class="h-9 flex">
                <a :disabled="tp==page"  @click="setpage(tp)" href="javascript:void(0);" :class="['px-3 py-2 leading-tight border transition-all', tp==page ? 'bg-blue text-white border-blue pointer-events-none':'bg-white text-gray-500 border-gray-300 hover:bg-gray',tp == 1 ? '':tp == totalpages ? '': tp==page ? '':'hidden md:flex']">
                    {{ tp }}
                </a>
            </li>
            
            <li  v-show="page<totalpages" @click="nextpage">
                <a href="javascript:void(0);" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg transition-all hover:bg-gray">
                    <span class="sr-only">Next</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </a>
            </li>
        </ul>
    </nav>
    
</template>
<script>
export default {
    props:['page','totalpages'],
    data() {
      return {
        attPage: ''
      }
    },
    methods:{
        setpage(value){
            this.attPage = value
            this.$emit('attPageEmit',this.attPage)
        },
        prevpage(){
            this.attPage--
            this.$emit('attPageEmit',this.attPage)
        },
        nextpage(){
            this.attPage++
            this.$emit('attPageEmit',this.attPage)
        }
    }

}
</script>