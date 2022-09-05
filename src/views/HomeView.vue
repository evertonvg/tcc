<template>
  <section class="mt-20 bg-lightblue">
    <div class="mx-auto container font-otaku ">
      <h2 class="text-left text-2xl font-bold pt-6">Noticias sobre o mundo dos animes</h2>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
export default {
  name: "HomeView",
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$cookies.remove("loginIdAnime");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // if(this.$cookies.get("loginIdAnime")==null){
    // 	this.$router.push('/login')
    // }
    document.title = "Otaku Stars - Inicio";
  },
};
</script>
