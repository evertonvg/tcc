<template>
  <header class="text-gray-600 body-font bg-lightblue">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" v-show="verifyrouteVariable == true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span class="ml-3 text-xl">{{ local }}</span>
        </a>
        <button v-show="verifyrouteVariable == true"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4"
          @click="openModal" 
        >
          Add 
        </button>
        <nav
          class="md:ml-auto flex flex-wrap items-center text-base justify-center"
        ></nav>
        <button
          class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          @click="$router.go(-1)"
        >
          Back
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
</template>

<script>
export default {
    name:'adminHeader',
    props:['openModal','local'],
    data() {
        return {
          verifyrouteVariable:true,
    }},
    methods:{
      verifyroute(){
        let routes = ['comments','reports','users']
        let words = this.$route.path.split('/')
        words = words.map((item)=>{
            return item.toLowerCase()
        })
 
        if(words.some((item)=>{
                return routes.includes(item.toLowerCase())
            })){
              
              this.verifyrouteVariable =  false
            }else{
           
              this.verifyrouteVariable =  true
            }
            console.log(this.verifyrouteVariable)
      }
    },
    
    mounted(){
      this.verifyroute()
    }

}
</script>

<style>

</style>