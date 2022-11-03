<template>
  <section></section>
</template>

<script>
import firebase from "firebase";
export default {
    data() {
        return {
            anime: null
        }
    },
    methods:{
        getAnime(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                this.anime =  []
                this.anime = snapshot.val()
                snapshot.forEach((ss) => {
                    this.anime = ss.val();
                });
                this.$store.commit('SET_LOADING',false)
            });
        }
    },
    mounted() {
        document.title = "Otaku Stars - Inicio";
        this.getAnime()
    },
}
</script>

<style>

</style>