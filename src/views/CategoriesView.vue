<template>
  <section class="mt-40 px-5 md:px-0">

    <div class="mx-auto container">
        <h2 class="text-left text-2xl font-bold pt-6 my-4">Lista de categorias</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <router-link v-for="(cat,index) in categories" :key="index" :to="`search/${cat.name.toString().toLowerCase().replaceAll(' ','-')}`">
                <div  class="h-64 relative">
                    <img :src="cat.image" :alt="cat.name" class="h-full w-full object-cover"/>
                    <div class="absolute bottom-0 left-0 bg-black/50 w-full p-2  text-left">
                        <h3 class="text-sm text-white">
                            <span class="opacity-100">
                            {{cat.name}}
                            </span>
                        </h3>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
  </section>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            categories:[]
        }
    },
    methods:{
        getCategories(){
        let ref = firebase.database().ref('categories');
        ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
            this.categories = [];
            snapshot.forEach((ss) => {
            this.categories.push(ss.val());
            });
            this.$store.commit('SET_LOADING',false)
            this.categories.sort((x,y)=>{
                let a = x.name.toLowerCase()
                let b = y.name.toLowerCase()
                return  a == b ? 0 : a > b ? 1 : -1
            })
        });
        }
    },
    mounted(){
        this.getCategories();
    }
}
</script>

<style>

</style>