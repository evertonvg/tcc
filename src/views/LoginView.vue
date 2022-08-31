<template>
  <section
    class="text-gray-600 body-font bg-cover bg-center bg-no-repeat h-screen transition-all"
    ref="logsection"
  >
    <div class="container px-5 py-12 mx-auto flex flex-wrap items-center">
      <div
        class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      >
        <div class="w-full md:pr-16 lg:pr-0 pr-0">
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
            A maior rede de avaliações de animes do Brasil.
          </p>
        </div>
        <h2 class="text-gray-900 text-lg font-medium title-font mb-2">
          Entre com uma de suas redes sociais
        </h2>
        <div class="flex items-center justify-center gap-4 mb-10">
          <div class="w-20 h-20 border cursor-pointer" @click="login('google')">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt="Login com o gooole"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-20 h-20 border cursor-pointer" @click="login('facebook')">
            <img
              src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png"
              alt="Login com o facebook"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="w-20 h-20 border cursor-pointer" @click="login('twitter')">
            <img
              src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png"
              alt="Login com o Twitter"
              class="w-full h-full object-cover"
            />
          </div>
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
      bgs: [
        "https://images6.alphacoders.com/844/844900.png",
        "data:image/jpeg;base64,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",
      ],
    };
  },
  methods: {
    background() {
      //   let index = Math.floor(Math.random() * this.bgs.length - 1);
      this.$refs.logsection.style.backgroundImage = `url(${this.bgs[0]})`;
      console.log(this.bgs[0]);
      //   this.$refs.logsection.style.backgroundImage = `url(${this.bgs[index]})`;
      //   setInterval(() => {
      //     let index = Math.floor(Math.random() * this.bgs.length - 1);
      //     this.$refs.logsection.style.backgroundImage = `url(${this.bgs[index]})`;
      //   }, 10000);
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
          console.log(res);

          this.$cookies.set("loginIdAnime", res.credential.accessToken);
          switch (link) {
            case "google":
              this.$cookies.set("imageAnime", res.additionalUserInfo.profile.picture);
              break;
            case "facebook":
              this.$cookies.set(
                "imageAnime",
                res.additionalUserInfo.profile.picture.data.url
              );
              break;
            case "twitter":
              this.$cookies.set(
                "imageAnime",
                res.additionalUserInfo.profile.profile_image_url_https
              );
              break;
          }

          this.$cookies.set("nameAnime", res.additionalUserInfo.profile.name);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  mounted() {
    this.background();
    if (this.$cookies.get("loginIdAnime") != null) {
      this.$router.push("/");
    }
  },
};
</script>
