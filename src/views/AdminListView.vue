<template>
  <div class="">
    <header class="text-gray-600 body-font bg-blue-500">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Admin</span>
            </a>
            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">

            </nav>
            <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" @click="logout">Logout
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            </button>
        </div>
    </header>
    <div class="w-1/3 bg-white rounded-lg shadow container flex justify-center mx-auto">
        <ul class="divide-y-2 divide-gray-100">
            <li class="p-3">
                <router-link to="/admin/animes">
                    Animes
                </router-link>
            </li>
            <li class="p-3">
                <router-link to="/admin/categories">
                    Categorias
                </router-link>
            </li>
            <li class="p-3">
                <router-link to="/admin/evaluations">
                    Avaliações
                </router-link>
            </li>
            <li class="p-3">
                <router-link to="/admin/comments">
                    Comentários
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';
import { mapGetters } from "vuex";

export default {
  name: 'HomeView',
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  methods:{
    logout(){
        firebase.auth().signOut().then(()=>{
            this.$cookies.remove("LoginId")
            this.$router.push('/admin')
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
  },
    mounted(){
        console.log(this.$cookies.get("LoginId"))
        if(this.$cookies.get("LoginId")==null){
            this.$router.push('/admin')
        }
    }
 
}
</script>
