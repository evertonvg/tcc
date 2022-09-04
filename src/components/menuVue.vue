<template>
  <nav v-show="$route.name != 'login'" class="bg-blue h-20 text-white font-otaku-bold">
    <div class="container flex items-center justify-center h-full">
      <div class="flex items-center justify-center">
        <router-link to="/" class="h-full">
          <img src="@/assets/img/icon.png" class="h-16" />
        </router-link>
      </div>
      <div :class="[`flex-1 flex justify-end items-center pr-5`]">
        <div
          v-if="$cookies.get('loginIdAnime') != null"
          :class="[`bg-darkblue rounded-sm p-2 flex items-center justify-center gap-2`]"
        >
          <img
            :src="$cookies.get('imageAnime')"
            referrerpolicy="no-referrer"
            class="rounded-full h-10"
          />
          <span>conectado como {{ $cookies.get("nameAnime") }} </span>
        </div>
      </div>
      <div>
        <ul class="h-full flex items-center justify-end gap-2">
          <li v-show="$cookies.get('loginIdAnime') == null">
            <router-link to="/login" class="">Conecte-se</router-link>
          </li>
          <li>
            <router-link to="/destaques">destaques</router-link>
          </li>
          <li>
            <router-link to="/categorias">categorias</router-link>
          </li>
          <li>
            <router-link to="/pesquisar">Pesquisar</router-link>
          </li>
          <li v-show="$cookies.get('loginIdAnime') != null" class="ml-4">
            <button @click="logout" class="flex items-center justify-center">
              Sair<Logout :size="50" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from "firebase";
import Logout from "vue-material-design-icons/Logout.vue";
export default {
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
  components: { Logout },
};
</script>
<style scoped></style>
