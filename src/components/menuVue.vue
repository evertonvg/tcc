<template>
  <nav
    ref="menu"
    v-show="$route.name != 'login' && !$route.fullPath.toString().includes('admin')"
    class="bg-blue h-20 text-white px-3 z-50  fixed top-0 left-0 w-full font-roboto transition-transform"
  >
    <div class="container items-center justify-center h-full flex mx-auto">
      <div class="flex items-center justify-center">
        <router-link to="/" class="h-full" @click="open=false">
          <img src="@/assets/img/icon.png" class="h-16" />
        </router-link>
      </div>
      <div class="flex-1"></div>
      <div class="mr-3 hidden sm:block relative">
            <div class="relative flex w-full flex-wrap items-stretch">
              <input
                  type="search"
                  v-model="search"
                  class=" transition-all  text-black relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none  duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  placeholder="Minimo 3 caracteres"
                  aria-label="Search"
                  aria-describedby="button-addon1" />
              <button
                  class="border relative z-[2] flex items-center rounded-r bg-blue px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg "
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-5 w-5">
                  <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd" />
                  </svg>
              </button>
            </div>
            
            <div class="absolute top-[100%] left-0 w-full flex flex-col">

              <div :data-to="`${getRoute}/animes/${item.slug}`" class="cursor-pointer w-full h-10 flex items-center justify-start bg-gray border p-1 pl-12 text-black relative" v-for="(item,index) in filteredList" :key="index" v-show="search.length>=3&&filteredList.length" @click="gosearch">
                <div class="w-10 h-full absolute left-0 right-0 pointer-events-none">
                  <img :src="`${item.image}`" class="w-full h-full object-cover" />
                </div>
                <p class="pointer-events-none">{{ item.name }}</p>
              </div>
              <div class="w-full h-10 flex items-center justify-start bg-gray border p-1 pl-4 text-black" v-if="search.length>=3&&!filteredList.length">
                <p>Nenhum resultado encontrado</p>
              </div>
            </div>
        </div>
      <div :class="[`flex justify-end items-center pr-5`]">
        <router-link :to="`/profile/${$cookies.get('slugName')}ososlklk${$cookies.get('idUser')}`" v-if="$cookies.get('loginIdAnime') != null" >
        <div
          
          :class="[`bg-darkblue rounded-sm p-2 flex items-center justify-center gap-2`]"
        >
          <div class="rounded-full h-10 w-10 overflow-hidden">
            <img
              :src="$cookies.get('imageAnime')"
              referrerpolicy="no-referrer"
              class="w-full h-full object-cover homephoto"
            />
          </div>
          
            <span class="hidden sm:block"
              >{{ $cookies.get("nameAnime") }}
            </span>
        </div>
      </router-link>
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
            <router-link to="/" :class="['hover:text-darkblue transition-colors']"
              >Inicio</router-link
            >
          </li>
          <!-- <li>
            <router-link to="/categories" class="hover:text-darkblue transition-colors"
              >categorias</router-link
            >
          </li> -->
          <li>
            <router-link to="/news" class="hover:text-darkblue transition-colors"
              >Noticias</router-link
            >
          </li>
          <li>
            <router-link to="/search" class="hover:text-darkblue transition-colors"
              >Animes</router-link
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
      'fixed lg:hidden top-0 right-0 w-screen h-screen bg-black transition-all z-40  font-roboto',
      !open ? 'translate-x-full' : '',
    ]"
  >
    <div
      class="absolute w-3/4 h-screen flex top-0 right-0 bg-lightblue font-roboto opacity-100"
    >
      <ul class="h-full flex items-start justify-center flex-col gap-2 pl-8">
        <li v-show="$cookies.get('loginIdAnime') == null" @click="open=!open">
          <router-link to="/login" class="text-2xl">Conecte-se</router-link>
        </li>
        <li @click="open=!open">
          <router-link class="text-2xl" to="/">Inicio</router-link>
        </li>
        <!-- <li @click="open=!open">
          <router-link class="text-2xl" to="/categories">categorias</router-link>
        </li> -->
        <li @click="open=!open">
          <router-link class="text-2xl" to="/news">Noticias</router-link>
        </li>
        <li @click="open=!open">
          <router-link class="text-2xl" to="/search">Animes</router-link>
        </li>
        <li @click="open=!open">
          <router-link class="text-2xl" to="/about">Sobre</router-link>
        </li>
        <li v-show="$cookies.get('loginIdAnime') != null" @click="open=!open">
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
  props:['animes'],
  data() {
    return {
      open: false,
      search:''
    };
  },
  computed:{
    filteredList(){
      return this.animes.filter(item => {
              return item.name.toLowerCase().includes(this.search.toLowerCase()) || item?.englishName?.toLowerCase().includes(this.search.toLowerCase()) || item?.portugueseName?.toLowerCase().includes(this.search.toLowerCase())
          }
      );
      
    },
    getRoute(){
        return window.location.origin
      }
  },
  methods: {
    gosearch(ev){
      window.location.href = ev.currentTarget.dataset.to
    },
    windowReload(){
      window.location.href = `/profile/${this.$cookies.get('slugName')}ososlklk${this.$cookies.get('idUser')}`
      
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("SET_MESSAGE", `Sayonara, sentiremos saudades :(`);
          this.$store.commit("SET_IMAGE_MESSAGE", "goodbye");
          this.$cookies.remove("loginIdAnime");
          this.$cookies.remove("imageAnime");
            this.$cookies.remove("idUser");
            this.$cookies.remove("nameAnime");
            this.$cookies.remove("slugName");
          this.$store.commit('SET_LOADING',true);
          window.location.href=`${window.location.origin}/login`
          // this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          this.$store.commit("SET_MESSAGE", `Erro ao fazer logout. Tente novamente.`);
          this.$store.commit("SET_IMAGE_MESSAGE", "error");
        });
    },
    scrollMenuEffect(value) {
      if (value > this.pagey) {
        if(this.$refs.menu){
          this.$refs.menu.classList.add("-translate-y-20");
        }
      } else {
        if(this.$refs.menu){
          this.$refs.menu.classList.remove("-translate-y-20");
        }
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
