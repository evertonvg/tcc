<template>
  <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
    <AdminHeader :openModal="openAddModal" local="animes"/>
    <div class="flex justify-center container mx-auto mt-4">
        <div class="mb-3 xl:w-full">
            <div class="relative mb-4 flex w-full flex-wrap items-stretch">
              <input
                  type="search"
                  v-model="search"
                  class="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                  placeholder="Pesquise o nome de algum anime."
                  aria-label="Search"
                  aria-describedby="button-addon1" />
              <button
                  class="relative z-[2] flex items-center rounded-r bg-blue px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
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
        </div>
    </div>
  
    <div class="overflow-x-auto container mx-auto  bg-white font-bold text-xl">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full font-bold text-xl">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  name
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  image
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Banner
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  description
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Categories
                </th>
                
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  active
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  active season
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  active new season
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  active new anime
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  operations
                </th>
              </tr>
            </thead>
            
            <tbody>
              <tr class="border-b" v-for="(ani, index) in animes" :key="index" v-show="ani.name.toLowerCase().includes(search.toLowerCase()) || (ani.englishName ? ani.englishName.toLowerCase().includes(search.toLowerCase()) : false) || (ani.portugueseName ? ani.portugueseName.toLowerCase().includes(search.toLowerCase()) : false) || search==''">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
                  jp: {{ ani.name }} <br>eng: {{ani.englishName}} <br>pt: {{ani.portugueseName}}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                >
                  <img
                    :src="ani.image"
                    :alt="ani.name"
                    class="w-40 h-full object-cover mx-auto"
                  />
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                >
                  <img
                    :src="ani.imageBanner"
                    :alt="ani.name"
                    class="w-40 h-full object-cover mx-auto"
                  />
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.description.substr(0, 50) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.categories }}
                </td>
                
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.active }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.activeSeason }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.newSeason }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ ani.newAnime }}
                </td>
                
                <td
                  class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center"
                >
                  <router-link
                    class="btn"
                    :data-id="ids[index]"
                    :to="`/animes/${ani.slug}`"
                  >Visit
                  </router-link>
                  <button
                    class="btn"
                    :data-id="ids[index]"
                    :data-name="ani.name"
                    :data-portuguesename= "ani.portugueseName"
                    :data-englishname="ani.englishName"
                    :data-description="ani.description"
                    :data-categories="ani.categories"
                    :data-image="ani.image"
                    :data-imageb="ani.imageBanner"
                    :data-active="ani.active"
                    :data-acseason="ani.activeSeason"
                    :data-newseason="ani.newSeason"
                    :data-newanime="ani.newAnime"
                    :data-release="ani.release"
                    :data-closure="ani.closure"
                    :data-seasons="ani.seasons"
                    :data-movies="ani.movies"
                    :data-ovas="ani.ovas"
                    @click="openUpdateModal"
                  >
                    Edit
                  </button>
                  <button
                    class="btn"
                    :data-id="ids[index]"
                    @click="deleteItem"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      id="defaultModal"
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-start flex bg-black"
      aria-modal="true"
      role="dialog"
      v-if="addModal || updateModal"
    >
    <div
        class="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-100"
      >
        <!-- Modal header -->
        <div
          
          class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
        >
          {{nameModal}}
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            @click="closeModals"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="anime.name"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >English Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="anime.englishName"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Portuguese Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                v-model="anime.portugueseName"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <!-- <div class="relative mb-4">
              <label for="release" class="leading-7 text-sm text-gray-600 block text-left"
                >lançamento
              </label>
              <input
                type="date"
                id="release"
                name="release"
                v-model="anime.release"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="closure" class="leading-7 text-sm text-gray-600 block text-left"
                >Encerramento
              </label>
              <input
                type="date"
                id="closure"
                name="closure"
                v-model="anime.closure"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="seasons" class="leading-7 text-sm text-gray-600 block text-left"
                >temporadas
              </label>
              <input
                type="number"
                min="0"
                id="seasons"
                name="seasons"
                v-model="anime.seasons"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div> -->
            <!-- <div class="relative mb-4">
              <label for="movies" class="leading-7 text-sm text-gray-600 block text-left"
                >filmes
              </label>
              <input
                type="number"
                min="0"
                id="movies"
                name="movies"
                v-model="anime.movies"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div> -->
            <!-- <div class="relative mb-4">
              <label for="ovas" class="leading-7 text-sm text-gray-600 block text-left"
                >ovas
              </label>
              <input
                type="number"
                id="ovas"
                name="ovas"
                v-model="anime.ovas"
                min="0"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div> -->
            <div class="relative mb-4">
              <label
                for="categories"
                class="leading-7 text-sm text-gray-600 block text-left"
                >categorias
              </label>
              <select
                multiple
                id="categories"
                name="categories"
                v-model="anime.categories"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              >
                <option
                  v-for="(cat, ind) in categoriesActive"
                  :key="ind"
                  :value="cat.name"
                  :selected="anime.categories.includes(cat.name)"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="leading-7 text-sm text-gray-600 block text-left"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                v-model="anime.description"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                ]"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label for="image" class="leading-7 text-sm text-gray-600 block text-left"
                >Image</label
              >
              <input
                type="file"
                id="image"
                name="image"
                ref="fileImage"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`,
                ]"
              />
              <br />
              <span class="text-left block" v-show="updateModal">
                *caso não insira uma imagem, a foto não mudará
              </span>
            </div>
            <div class="relative mb-4">
              <label for="image-banner" class="leading-7 text-sm text-gray-600 block text-left"
                >Image Banner</label
              >
              <input
                type="file"
                id="image-banner"
                name="image"
                ref="fileImageBanner"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`,
                ]"
              />
              <br />
              <span class="text-left block" v-show="updateModal">
                *caso não insira uma imagem, o banner não mudará
              </span>
            </div>
            <div class="relative mb-4" v-show="updateModal">
              <label for="active" class="leading-7 text-sm text-gray-600 block text-left"
                >active</label
              >
              <input
                type="checkbox"
                class="block"
                id="active"
                name="active"
                v-model="anime.active"
              />
            </div>
            
            <div class="relative mb-4" v-show="updateModal">
              <label
                for="activeseason"
                class="leading-7 text-sm text-gray-600 block text-left"
                >active season</label
              >
              <input
                type="checkbox"
                class="block"
                id="activeseason"
                name="activeseason"
                v-model="anime.activeSeason"
              />
            </div>
            
            <div class="relative mb-4" v-show="updateModal">
              <label
                for="activeseason"
                class="leading-7 text-sm text-gray-600 block text-left"
                >new anime</label
              >
              <input
                type="checkbox"
                class="block"
                id="activeseason"
                name="activeseason"
                v-model="anime.newAnime"
              />
            </div>
            <div class="relative mb-4" v-show="updateModal">
              <label
                for="activeseason"
                class="leading-7 text-sm text-gray-600 block text-left"
                >new season</label
              >
              <input
                type="checkbox"
                class="block"
                id="activeseason"
                name="activeseason"
                v-model="anime.newSeason"
              />
            </div>
          </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          <button
            v-show="addModal"
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white border border-b-darkblue bg-darkblue bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="addItem"
          >
            Add
          </button>
          <button
            v-show="updateModal"
            data-modal-toggle="defaultModal"
            type="button"
            class="text-white border-b-darkblue bg-darkblue  bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="updateItem"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <div
      v-show="showload"
      class="load w-screen h-screen fixed top-0 lef -inset-0 z-50 bg-blue flex items-center justify-center"
    >
      <span class="text-white text-lg"> CARREGANDO... </span>
    </div>
  </section>
</template>

<script>
import AdminHeader from './components/AdminHeader.vue';
import firebase from "firebase";
export default {
  components: { AdminHeader },
  data() {
    return {
      search:'',
      showLoad: true,
      addModal: false,
      updateModal: false,
      animes:[],
      nameModal:"",
      anime: {
        id:"",
        name: "",
        englishName:"",
        portugueseName:"",
        description: "",
        image: "",
        imageBanner:"",
        active: false,
        activeSeason: false,
        newSeason:false,
        newAnime:false,
        release:"",
        closure:"",
        movies:"",
        seasons:"",
        ovas:"",
        categories:[],

      },
      ids:[],
      categoriesActive:[]
    }
  },
  methods:{
    openAddModal(){
      this.addModal = true,
      this.nameModal = 'Adicionar Categoria'
      this.resetItems();
    },
    openUpdateModal(ev){
      this.updateModal = true
      this.nameModal = 'Editar Categoria'
      this.setItems(ev);
    },
    closeModals() {
      this.addModal = false;
      this.updateModal = false;
      
    },
    resetItems() {
      this.anime.id = "",
      this.anime.portugueseName = ""
      this.englishName = "";
      this.anime.name = "";
      this.anime.description = "";
      this.anime.image = "";
      this.imageBanner = "";
      this.anime.active = false;
      this.anime.activeSeason = false;
      this.anime.newSeason = false,
      this.anime.newAnime = false,
      // this.anime.release = "";
      // this.anime.closure = "";
      // this.anime.movies = "";
      // this.anime.seasons = "";
      // this.anime.ovas = "";
      this.anime.categories = [];
    },
    setItems(ev){
      this.anime.id = ev.target.dataset.id.toString(),
      this.anime.name = ev.target.dataset.name.toString();
      this.portugueseName = ev.target.dataset.portugueseName ? ev.target.dataset.portugueseName.toString() : '';
      this.englishName = ev.target.dataset.englishname ? ev.target.dataset.englishname.toString() : '';
      this.anime.description = ev.target.dataset.description.toString();
      this.anime.image = ev.target.dataset.image;
      this.anime.imageBanner = ev.target.dataset.imageb;
      this.anime.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
      this.anime.activeSeason = ev.target.dataset.acseason == 'true' ? true : ev.target.dataset.acseason == true? true : false;
      this.anime.newSeason = ev.target.dataset.newseason == 'true' ? true : ev.target.dataset.newseason == true? true : false;
      this.anime.newAnime = ev.target.dataset.newanime == 'true' ? true : ev.target.dataset.newanime == true? true : false;
      // this.anime.release = ev.target.dataset.release;
      // this.anime.closure = ev.target.dataset.closure;
      // this.anime.movies = parseInt(ev.target.dataset.movies);
      // this.anime.seasons = parseInt(ev.target.dataset.seasons);
      // this.anime.ovas = parseInt(ev.target.dataset.ovas);
      this.anime.categories = ev.target.dataset.categories.split(','); //
    },


    getData(){
      let ref = firebase.database().ref('animes');
      ref.orderByChild("name").on("value", (snapshot) => {
        this.animes = []
        this.ids = []
        snapshot.forEach((ss) => {
            this.animes.push(ss.val());
            this.ids.push(ss.key);
        });
        this.showload = false;
      });


      let categories = firebase.database().ref("categories");
      categories.orderByChild("name").on("value", (snapshot) => {
          this.categoriesActive = [];
          snapshot.forEach((ss) => {
            this.categoriesActive.push(ss.val());
          });
      });
    },
    addItem() {

        firebase.storage().ref('animes').child(this.anime.name).child(this.$refs.fileImage.files[0].name)
        .put(this.$refs.fileImage.files[0])
          .then((res) => {
          res.ref.getDownloadURL()
          .then((image) => {
            this.anime.image = image;
          })
          .then(()=>{
            firebase.storage().ref('animes').child(this.anime.name).child(this.$refs.fileImageBanner.files[0].name)
            .put(this.$refs.fileImageBanner.files[0])
            .then((ress) => {
              ress.ref.getDownloadURL()
              .then((imageb) => {
                  this.anime.imageBanner = imageb;
              })
              .then(()=>{
                let ref = firebase.database().ref('animes');
                ref.push({
                  name: this.anime.name,
                  englishName:this.anime.englishName,
                  portugueseName:this.anime.portugueseName,
                  slug:this.anime.name.toString().toLowerCase().replaceAll(' ','-').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""),
                  description: this.anime.description,
                  image: this.anime.image,
                  imageBanner: this.anime.imageBanner,
                  active: this.anime.active,
                  activeSeason: false,
                  newSeason:false,
                  newAnime:false,
                  // release: this.anime.release,
                  // closure:this.anime.closure,
                  // movies:this.anime.movies,
                  // seasons:this.anime.seasons,
                  // ovas:this.anime.ovas,
                  categories:this.anime.categories,
                }).then(() => {
                    this.closeModals();
                    this.showLoad = false
                }).catch((err) => {
                  console.log(err);
                });
              })
            })
            .catch((err) => {
              console.log(err);
            });
          })
        })
        .catch((err) => {
          console.log(err);
        });
  
    },
    async updateItem() {
      if(this.$refs.fileImage.files[0]) {
        firebase.storage()
              .ref("animes")
              .child(this.anime.name)
              .child(this.$refs.fileImage.files[0].name)
              .put(this.$refs.fileImage.files[0])
              .then((res) => {
                res.ref.getDownloadURL()
                .then((image) => {
                  this.anime.image = image;
                  let ref = firebase.database().ref("animes").child(this.anime.id);
                  ref.update({
                    image: this.anime.image,
                  })
                })
                .catch((err) => {
                    console.log(err);
                });
          })
          .catch((err) => {
              console.log(err);
          });
        }

        if(this.$refs.fileImageBanner.files[0]) {
        firebase.storage()
              .ref("animes")
              .child(this.anime.name)
              .child(this.$refs.fileImageBanner.files[0].name)
              .put(this.$refs.fileImageBanner.files[0])
              .then((res) => {
                res.ref.getDownloadURL()
                .then((imageb) => {
                  this.anime.imageBanner = imageb;
                  let ref = firebase.database().ref("animes").child(this.anime.id);
                  ref.update({
                    imageBanner: this.anime.imageBanner,
                  })
                })
                .catch((err) => {
                    console.log(err);
                });
          })
          .catch((err) => {
              console.log(err);
          });
        }
      
          let ref = firebase.database().ref("animes").child(this.anime.id);
          ref.update({
            name: this.anime.name,
            slug:this.anime.name.toString().toLowerCase().replaceAll(' ','-').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""),
            description: this.anime.description,
            englishName:this.anime.englishName,
            portugueseName:this.anime.portugueseName,
            active: this.anime.active,
            activeSeason: this.anime.activeSeason,
            newSeason:this.anime.newSeason,
            newAnime:this.anime.newAnime,
            // release: this.anime.release,
            // closure:this.anime.closure,
            // movies:this.anime.movies,
            // seasons:this.anime.seasons,
            // ovas:this.anime.ovas,
            categories:this.anime.categories,
          }).then(() => {
              this.closeModals();
              this.showLoad = false
              
          }).catch((err) => {
              console.log(err);
          });
      
    },
    deleteItem(ev) {
      let ref = firebase.database().ref("animes");
      ref.child(ev.target.dataset.id)
          .remove()
    },
  
  },
  mounted() {
      this.getData();
      if (this.$cookies.get("LoginId") == null) {
          this.$router.push("/admin");
      }
      this.$store.commit("SET_LOADING", false);
  },
  
}
</script>

<style scoped>
  *{
    font-weight: bold;
  }
</style>