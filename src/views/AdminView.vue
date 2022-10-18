<template>
  <div class="" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
    <header class="text-gray-600 body-font bg-lightblue">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span class="ml-3 text-xl">Admin</span>
            </a>
            
        </div>
    </header>
    <div class="w-full h-screen cursor-pointer bg-white rounded-lg shadow container flex justify-center items-center mx-auto flex-col">
        <div class="flex items-center justify-center">
            <div class=" bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign Up Admin</h2>
                <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600 text-left w-full block">Email</label>
                <input type="email" id="email" v-model="email" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                <label for="password" class="leading-7 text-sm text-gray-600 text-left w-full block">Password</label>
                <input type="password" v-model="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click="loginAdmin">Button</button>
                
            </div>
        </div>
      
       
        <div class="text-center mt-5 text-red-500">
            {{errors}}
        </div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase';
import { mapGetters } from "vuex";

export default {
  name: 'AdminHomeView',
  data() {
    return {
        email: '',
        password: '',
        errors:''
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  methods:{
    loginAdmin(){
        this.errors = ''
        firebase.auth().signInWithEmailAndPassword(this.email,this.password)
            .then((res) => {
                // See the UserRecord reference doc for the contents of userRecord.
                this.$cookies.set("LoginId", res.user.uid, "1h")
                this.$router.push('/admin/items')
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
                this.errors = 'Usuário ou senha invalidos'
            });
        }
    },
    mounted(){
        if(this.$cookies.get("LoginId")!=null){
            this.$router.push('/admin/items')
        }
        console.log(typeof this.$cookies.get("LoginId"))
    }
}
</script>
