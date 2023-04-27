<template>
    <div class="container mx-auto mt-20 pb-20 font-otaku-bold">
      <h1 class="text-center">Pagina inexistente</h1>
      <span
        >Clique <router-link to="/" class="h-full text-darkblue"> aqui </router-link> para
        voltar para a home</span
      >
      <img
        src="@/assets/img/604589.jpg"
        alt="não encontrado"
        class="w-96 max-w-full mx-auto block mt-5"
      />
      {{ user }}
    </div>
  </template>
  
  <script>
  import firebase from "firebase";
  export default {
    data() {
        return {
            user:''
        };
    },
    methods:{
        getData(){
            let ref = firebase.database().ref('users');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                snapshot.forEach((ss) => {
                    this.user = ss.val();
                    this.user.id = ss.key;
                });
                document.title = `Perfil de ${this.user.name} Otaku Stars`;
                this.$store.commit('SET_LOADING',false)

                if(this.user.length == 0){
                    history.back();
                    setTimeout(()=>{
                        window.location.reload()
                    },100)
                }
          })
        },
    },
    mounted() {
        this.getData()
    },
  };
  </script>
  
  <style></style>
  