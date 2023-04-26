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
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "Otaku Stars - pagina não encontrada";
    this.$store.commit('SET_LOADING',false)
  },
};
</script>

<style></style>
