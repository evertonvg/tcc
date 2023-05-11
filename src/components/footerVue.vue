<template>
  <footer v-show="$route.name != 'login'" class="bg-blue py-12 mt-12">
    <div class="container flex items-center justify-between flex-col gap-4 mx-auto">
        <p class="text-white text-center mx-auto">
            2023 - Everton Vargas Guetierres&#169; - todos os direitos reservados
        </p>
        <div class="flex gap-3">
            <a href="https://www.linkedin.com/in/everton-guetierres-b57781174/" target="_blank">
                <img src="@/assets/img/linkedin.png" alt="" class="w-12">
            </a>
            <a href="mailto:evertoniee@yahoo.com.br" target="_blank">
                <img src="@/assets/img/email.png" alt="" class="w-12">
            </a>
            <a href="https://www.facebook.com/evertonguetierres/" target="_blank">
                <img src="@/assets/img/facebook.png" alt="" class="w-12">
            </a>
        </div>
        <div class="flex gap-3">
            <router-link class="btn" to="/admin">Acessar como administrador</router-link>
        </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>

</style>