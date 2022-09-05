<template>
  <nav
    ref="menu"
    v-show="$route.name != 'login'"
    class="bg-blue h-20 text-white px-3 z-20  font-otaku fixed top-0 left-0 w-full"
  >
    <div class="container items-center justify-center h-full flex">
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
          <span class="hidden sm:block"
            >conectado como {{ $cookies.get("nameAnime") }}
          </span>
        </div>
        <div
          v-else
          :class="[`bg-red rounded-sm p-2 flex items-center justify-center gap-2`]"
        >
          <router-link to="/login" class="">Login</router-link>
        </div>
      </div>
      <div class="hidden lg:block font-otaku-bold text-xs">
        <ul class="h-full flex items-center justify-end gap-2">
          <li>
            <router-link to="/destaques" class="hover:text-darkblue transition-colors"
              >destaques</router-link
            >
          </li>
          <li>
            <router-link to="/categorias" class="hover:text-darkblue transition-colors"
              >categorias</router-link
            >
          </li>
          <li>
            <router-link to="/pesquisar" class="hover:text-darkblue transition-colors"
              >Pesquisar</router-link
            >
          </li>
          <li v-show="$cookies.get('loginIdAnime') != null" class="ml-4">
            <button
              @click="logout"
              class="flex items-center justify-center hover:text-darkblue transition-colors"
            >
              Sair<Logout :size="50" />
            </button>
          </li>
        </ul>
      </div>
      <div class="block lg:hidden">
        <div class="flex lg:hidden">
          <div class="space-y-3" @click="open = !open">
            <span
              :class="[
                'block w-12 h-1 bg-white transition-all',
                open ? ' rotate-45 translate-y-4' : '',
              ]"
            ></span>
            <span
              :class="[
                'block w-12 h-1 bg-white transition-all',
                open ? ' rotate-45' : '',
              ]"
            ></span>
            <span
              :class="[
                'block w-12 h-1 bg-white transition-all',
                open ? ' -rotate-45 -translate-y-4' : '',
              ]"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div
    :class="[
      'fixed lg:hidden top-0 right-0 w-screen h-screen bg-black transition-all z-10 opacity-75',
      !open ? 'translate-x-full' : '',
    ]"
  >
    <div
      class="absolute w-3/4 h-screen flex top-0 right-0 bg-lightblue font-otaku-bold opacity-80"
    >
      <ul class="h-full flex items-center justify-center flex-col gap-2 pl-8">
        <li v-show="$cookies.get('loginIdAnime') == null">
          <router-link to="/login" class="text-2xl">Conecte-se</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/destaques">destaques</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/categorias">categorias</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/pesquisar">Pesquisar</router-link>
        </li>
        <li v-show="$cookies.get('loginIdAnime') != null" class="ml-4">
          <button @click="logout" class="flex items-center justify-center text-2xl">
            Sair<Logout :size="50" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import Logout from "vue-material-design-icons/Logout.vue";
export default {
  data() {
    return {
      open: false,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("SET_MESSAGE", `Sayonara, sentiremos saudades :(`);
          this.$store.commit("SET_IMAGE_MESSAGE", "goodbye");
          this.$cookies.remove("loginIdAnime");
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollMenuEffect(value) {
      if (value > this.pagey) {
        this.$refs.menu.classList.add("-translate-y-16");
      } else {
        this.$refs.menu.classList.remove("-translate-y-16");
      }
      this.pagey = value;
    },
  },
  components: { Logout },
  mounted() {
    window.addEventListener("scroll", () => {
      this.scrollMenuEffect(window.pageYOffset);
    });
  },
};
</script>
<style scoped></style>
