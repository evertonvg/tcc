<template>
  <nav
    ref="menu"
    v-show="$route.name != 'login' && !$route.fullPath.toString().includes('admin')"
    class="bg-blue h-20 text-white px-3 z-20  fixed top-0 left-0 w-full font-roboto transition-transform"
  >
    <div class="container items-center justify-center h-full flex mx-auto">
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
      <div class="hidden lg:block font-roboto text-lg">
        <ul class="h-full flex items-center justify-end gap-2">
          <li>
            <router-link to="/destaques" class="hover:text-darkblue transition-colors"
              >destaques</router-link
            >
          </li>
          <li>
            <router-link to="/categories" class="hover:text-darkblue transition-colors"
              >categorias</router-link
            >
          </li>
          <li>
            <router-link to="/search" class="hover:text-darkblue transition-colors"
              >Pesquisar</router-link
            >
          </li>
          <li>
            <router-link to="/about" class="hover:text-darkblue transition-colors"
              >Sobre</router-link
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

      <div class="block lg:hidden font-roboto">
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


  <!-- mobile  -->
  <div
    :class="[
      'fixed lg:hidden top-0 right-0 w-screen h-screen bg-black transition-all z-10  font-roboto',
      !open ? 'translate-x-full' : '',
    ]"
  >
    <div
      class="absolute w-3/4 h-screen flex top-0 right-0 bg-lightblue font-roboto opacity-100"
    >
      <ul class="h-full flex items-start justify-center flex-col gap-2 pl-8">
        <li v-show="$cookies.get('loginIdAnime') == null">
          <router-link to="/login" class="text-2xl">Conecte-se</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/destaques">destaques</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/categories">categorias</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/search">Pesquisar</router-link>
        </li>
        <li>
          <router-link class="text-2xl" to="/about">Sobre</router-link>
        </li>
        <li v-show="$cookies.get('loginIdAnime') != null">
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
          this.$store.commit('SET_LOADING',true);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    scrollMenuEffect(value) {
      if (value > this.pagey) {
        this.$refs.menu.classList.add("-translate-y-20");
      } else {
        this.$refs.menu.classList.remove("-translate-y-20");
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
