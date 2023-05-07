<template>
  <section
    class="text-gray-600 body-font bg-cover bg-right md:bg-center bg-no-repeat h-screen transition-all font-roboto overflow-hidden"
    ref="logsection"
  >
    <div class="container px-2 py-4 mx-auto flex flex-wrap items-center">
      <div
        class="lg:w-2/6 md:w-1/2 bg-gray rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      >
        <div class="w-full  pr-0">
          <div class="text-center">
            <img
              src="../assets/img/icon.png"
              alt="icone da plataforma"
              class="block mx-auto"
              width="150"
            />
          </div>
          <h1 class="title-font font-medium text-3xl text-gray-900">
            Bem vindo ao OTAKU STARS!!
          </h1>
          <p class="leading-relaxed mt-4 mb-2">
            A maior rede de avaliativa de animes do Brasil.
          </p>
        </div>
        <h2 class="text-gray-900 text-lg font-medium title-font mb-4">
          Entre com uma de suas redes sociais
        </h2>
        <div class="flex items-center justify-center gap-4 mb-10">
          <div class="w-20 h-20 cursor-pointer" @click="login('google')">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt="Login com o gooole"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-20 h-20 cursor-pointer" @click="login('facebook')">
            <img
              src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"
              alt="Login com o facebook"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-20 h-20 cursor-pointer" @click="login('twitter')">
            <img
              src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png"
              alt="Login com o Twitter"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <router-link to="/" class="btn flex items-center justify-center gap-4 w-[161px] mx-auto">
            <home-circle></home-circle>  Ir para a home
          </router-link>
        </div>
        <!-- <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click="signup">Logar</button> -->
        <p class="text-xs text-gray-500 mt-3">*Seus dados pessoais não serão salvos.</p>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase";
export default {
  name: "LoginView",
  data() {
    return {
      bgs: ["https://images6.alphacoders.com/844/844900.png"],
      idUser:'',
      user:'',
      users:[]
    };
  },
  methods: {
    background() {
      this.$refs.logsection.style.backgroundImage = `url(${this.bgs[0]})`;
    },
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    putData(res){
      let ref = firebase.database().ref('users');
      ref.orderByChild('idFirebaset').equalTo(res.user.uid).limitToFirst(1).on("value", (snapshot) => {
            snapshot.forEach((ss) => {
                this.idUser = ss.key;
                this.user = ss.val();
            });

            if(this.user.active==false){
              this.$store.commit(
              "SET_MESSAGE",
              `Sua conta foi temporariamente suspensa. Motivo:${this.user.banText}. Entre em <a class="text-red font-bold font-xl" href="mailto:evertoniee@yahoo.com.br" target="_blank">
                contato
              </a> com os administradores`
            );
            this.$store.commit("SET_IMAGE_MESSAGE", "error");
              return false;
            }
            this.$cookies.set("imageAnime", this.user.image);
            this.$cookies.set("idUser", this.user.idUser);
            this.$cookies.set("nameAnime", this.user.name);
            this.$cookies.set("slugName", this.user.slug);

            this.$cookies.set("loginIdAnime", res.credential.accessToken);
            this.$store.commit(
              "SET_MESSAGE",
              `Bem vindo(a) ${this.$cookies.get("nameAnime")} ^^`
            );
            this.$store.commit("SET_IMAGE_MESSAGE", "welcome");
            this.$store.commit('SET_LOADING',true);
            this.$router.push("/");
          })
    },
    getUser(){
      let ref = firebase.database().ref('users');
        ref.orderByChild('idUser').equalTo(this.$cookies.get("idUser")).limitToFirst(1).once("value", (snapshot) => {
          this.users = []
          snapshot.forEach((ss) => {
              this.users = ss.val();
              this.users.id = ss.key;
          });
        })
    },
    login(link) {
      let provider;
      switch (link) {
        case "google":
          provider = new firebase.auth.GoogleAuthProvider();
          break;
        case "facebook":
          provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope("user_photos");
          break;
        case "twitter":
          provider = new firebase.auth.TwitterAuthProvider();
          break;
      }

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          
          let ref = firebase.database().ref('users'); 
          if(res.additionalUserInfo.isNewUser == true){
            ref.push({
                active:true,
                banText:'',
                location:'',
                bio:'',
                slug:res.additionalUserInfo.profile.name.toLowerCase().replaceAll(' ','-').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""),
                idFirebaset: res.user.uid,
                idUser: res.additionalUserInfo.profile.id.toString(),
                name: res.additionalUserInfo.profile.name,
                image: link == 'google' ? res.additionalUserInfo.profile.picture : link == 'facebook' ? res.additionalUserInfo.profile.picture.data.url : res.additionalUserInfo.profile.profile_image_url_https
            })
            this.putData(res)
          }else{
            this.putData(res)
          }
          
          
        })
        .catch((err) => {
          console.log(err.message);
          this.$store.commit(
            "SET_MESSAGE",
            `Erro ao fazer login. Por favor tente mais tarde.`
          );
          this.$store.commit("SET_IMAGE_MESSAGE", "error");
  
        });
    },
  },
  mounted() {
    this.background();
    if (this.$cookies.get("loginIdAnime") != null) {
      this.$router.push("/");
    }
    document.title = "Otaku Stars - Bem vindo ao otaku stars, faça login para continuar";
    this.$store.commit('SET_LOADING',false);
  },
};
</script>
