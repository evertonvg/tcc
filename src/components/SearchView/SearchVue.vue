<template>

    <h2 class="text-left text-2xl font-bold  pt-6 my-4 container mx-auto px-5 xl:px-0 cursor-pointer mt-24" @click="enableCats=!enableCats" >
        <span class="float-left">Lista de categorias</span> <ArrowDown  size="30" :class="['transition-all block float-left',enableCats ? 'rotate-180' : 'rotate-0']"/>
    </h2>
    <transition name="fade">
        <div class="container mx-auto  grid grid-cols-3 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4 px-5 xl:px-0 clear-both mt-16" v-show="enableCats">
            <div v-for="(cat,index) in categories" :key="index" class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                    class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid  outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary dark:checked:border-primary checked:bg-blue  checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                    type="checkbox"
                    :value="cat.name"
                    v-model="filtercategories"
                    :id="cat.name+'cat'" />
                <label
                    class="inline-block pl-[0.15rem] hover:cursor-pointer float-left font-bold"
                    :for="cat.name+'cat'">
                    {{ cat.name }}
                </label>
            </div>
        </div> 
    </transition>

    <div class="container mx-auto mt-4 px-5 xl:px-0">
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-if="$route.params.category">Lista de animes da categoria {{ $route.params.category }}</h2>
        <h2 class="text-left text-2xl font-bold pt-6 my-4" v-else>Lista de animes</h2>
        <div class="flex justify-center">
            <div class="mb-3 w-full">
                <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    v-model="datapesquisa"
                    
                    class="relative m-0 -mr-px block  min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                    placeholder="Pesquise o nome de algum anime. Minimo de 3 letras."
                    aria-label="Search"
                    aria-describedby="button-addon1" />
                <button
                    class="relative z-[2] flex items-center rounded-r bg-blue px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                    type="button"
                    id="button-addon1"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5">
                    <path
                        fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                        clip-rule="evenodd" />
                    </svg>
                </button>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
    export default {
        props:['pesquisa','categories','setcategories'],
        data() {
            return {
                datapesquisa:'',
                filtercategories:[],
                enableCats:true
            }
        },
        
        watch:{
            datapesquisa(){
                this.$emit('attSearchEmit',this.datapesquisa)
            },
            filtercategories(){
                this.$emit('attFilterEmit',this.filtercategories)
            },
        },
 
        mounted(){
            this.datapesquisa = this.pesquisa
            if(window.innerWidth <600){
                this.enableCats = false
            }
            if(this.$route.query.categories){
                this.filtercategories=this.$route.query.categories.split(',')
            }
            
        }
    }
</script>