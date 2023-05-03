<template>
  <header class="lg:h-[50vh] h-80  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner">
        <div class="container h-full mx-auto relative">
        </div>
    </header>
  <div class="container mx-auto mt-20 pb-20 bg-white p-7">
    <h1 class="text-center">Pagina inexistente</h1>
    <span
      >Clique <router-link to="/" class="h-full text-darkblue"> aqui </router-link> para
      voltar para a home</span
    >
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Otaku Stars - pagina não encontrada";
    this.$store.commit('SET_LOADING',false)
    this.$refs.banner.style.backgroundImage = `url(https://p4.wallpaperbetter.com/wallpaper/581/725/137/anime-lucky-star-konata-izumi-windows-wallpaper-preview.jpg)`

  },
};
</script>

<style></style>
