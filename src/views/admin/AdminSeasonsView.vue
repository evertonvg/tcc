<template>
    <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
      <AdminHeader :openModal="openAddModal" local="seasons"/>
  
      <div class="overflow-x-auto container mx-auto">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class="border-b">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    name anime - id anime
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    name season
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Order
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Author
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Launch
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Number of episodes
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Studio
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Videos
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
                    operations
                  </th>
                </tr>
              </thead>
              
              <tbody>
                <tr class="border-b" v-for="(season, index) in seasons" :key="index">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.anime }} - {{season.idAnime}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.name}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.order}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.author }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.launch }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.numberEpisodes }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.studio }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.status }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.videos}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.active }}
                  </td>
                  
                  <td class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center">
                    <button
                      class="btn"
                      :data-id="ids[index]"
                      :data-name-anime="season.anime"
                      :data-idanime="season.idAnime"
                      :data-order="season.order"
                      :data-author="season.author"
                      :data-launch="season.launch"
                      :data-episodes="season.numberEpisodes"
                      :data-acseason="season.studio"
                      :data-status="season.status"
                      :data-videos="season.videos"
                      :data-active="season.active"
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
                <label for="anime" class="leading-7 text-sm text-gray-600 block text-left"
                  >Name anime
                </label>
                <select @change="setAnimeId"
                  id="anime"
                  name="anime"
                  v-model="season.anime"
                  :class="[
                    'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                  ]"
                >
                  <option
                    v-for="(anime, ind) in animesActive"
                    :key="ind"
                    :value="anime.name"
                    :selected="season.anime.includes(anime.name)"
                    :data-id="animesIds[ind]"
                  >
                    {{ anime.name }}
                  </option>
                </select>
              </div>
              <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Name
                </label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="season.name"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="ovas" class="leading-7 text-sm text-gray-600 block text-left"
                >Ordem
              </label>
              <input
                type="number"
                id="ovas"
                name="ovas"
                v-model="season.order"
                min="0"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="author" class="leading-7 text-sm text-gray-600 block text-left"
                >Author
                </label
              >
              <input
                type="text"
                id="author"
                name="author"
                v-model="season.author"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
              <div class="relative mb-4">
                <label for="release" class="leading-7 text-sm text-gray-600 block text-left"
                  >lançamento
                </label>
                <input
                  type="date"
                  id="release"
                  name="release"
                  v-model="season.launch"
                  :class="[
                    'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                  ]"
                />
              </div>
              <div class="relative mb-4">
              <label for="episodes" class="leading-7 text-sm text-gray-600 block text-left"
                >numero de episódios
                </label
              >
              <input
                type="number"
                id="episodes"
                name="episodes"
                v-model="season.numberEpisodes"
                min="0"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="studio" class="leading-7 text-sm text-gray-600 block text-left"
                >Studio
                </label
              >
              <input
                type="text"
                id="studio"
                name="studio"
                v-model="season.studio"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
                <label for="status" class="leading-7 text-sm text-gray-600 block text-left"
                  >Status
                </label>
                <select
                  id="status"
                  name="status"
                  v-model="season.status"
                  :class="[
                    'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                  ]"
                >
                  <option value="Lançamento">
                    Lançamento
                  </option>
                  <option value="Em exibição">
                    Em exibição
                  </option>
                  <option value="Finalizado">
                    Finalizado
                  </option>
                </select>
              </div>

              <div class="relative mb-4">
              <label for="videos" class="leading-7 text-sm text-gray-600 block text-left w-full"
                >Videos 
                <span class="rounded-full w-11 h-11 p-1 bg-blue text-white cursor-pointer" @click="addField">+</span>
                <span class="rounded-full w-11 h-11 p-1 bg-blue text-white cursor-pointer ml-4" @click="removeField">-</span>
                </label
              >
              <div v-for="(n,index) in videosLength" :key="index" class="flex gap-2">
                <input  ref="nameVideo"
                    type="text"
                    id="videos"
                    name="videos"
                    placeholder="insira o nome do video (opening, ending, etc...)"
                    :class="[
                    'w-full mb-4 block bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                    ]"
                />
                <input  ref="linkVideo"
                type="text"
                id="videos"
                name="videos"
                placeholder="insira o link do youtube do video (formato embed. Exemplo: https://www.youtube.com/embed/LZtkQdLM1rc)"
                :class="[
                  'w-full mb-4 block bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
              </div>
              
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
        videosLength:1,
        showLoad: true,
        addModal: false,
        updateModal: false,
        seasons:[],
        nameModal:"",
        season: {
          id:"",
          anime: "",
          animeId: "",
          name:"",
          order: "",
          author:"",
          launch: "",
          numberEpisodes: "",
          studio:"",
          status:"",
          videos:[],
          active:false,
  
        },
        ids:[],
        animessActive:[],
        animesIds:[]
      }
    },
    methods:{
        addField(){
            this.videosLength++
        },
        removeField(){
            this.videosLength--
            if(this.videosLength<1){
                this.videosLength=1
            }
        },
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
        this.season.id = "",
        this.season.name = "";
        this.season.anime = "";
        this.season.idAnime = "";
        this.season.order = "";
        this.season.author = "";
        this.season.launch = "";
        this.season.numberEpisodes = "";
        this.season.studio = "";
        this.season.status = "";
        this.season.videos = [];
        this.season.active = false;
      },
      setItems(ev){
        this.season.id = ev.target.dataset.id.toString(),
        this.season.name = ev.target.dataset.name.toString();
        this.season.anime = ev.target.dataset.anime.toString();
        this.season.idAnime = ev.target.dataset.idanime;
        this.season.order = ev.target.dataset.order;
        this.season.author = ev.target.dataset.author;
        this.season.launch = ev.target.dataset.launch;
        this.season.numberEpisodes = ev.target.dataset.numberEpisodes;
        this.season.studio= ev.target.dataset.studio;
        this.season.status = ev.target.dataset.status;
        this.season.videos = ev.target.dataset.videos.split(','); //
        this.season.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
      },
        setAnimeId(ev){
            // this.season.animeId = ev.target.dataset.animeId;
            this.season.idAnime = ev.target.selectedOptions[0].dataset.id
        },    
            
      getData(){
        let ref = firebase.database().ref('seasons');
        ref.orderByChild("name").on("value", (snapshot) => {
          this.seasons = []
          this.ids = []
          snapshot.forEach((ss) => {
              this.seasons.push(ss.val());
              this.ids.push(ss.key);
          });
          this.showload = false;
        });
  
  
        let animes = firebase.database().ref("animes");
        animes.orderByChild("name").on("value", (snapshot) => {
            this.animesActive = [];
            this.animesIds = []
            snapshot.forEach((ss) => {
                this.animesActive.push(ss.val());
                this.animesIds.push(ss.key);
            });
        });
      },
      addItem() {
  
        let ref = firebase.database().ref('seasons');
                  ref.push({
                        anime: this.season.anime,
                        idAnime: this.season.idAnime,
                        name: this.season.name,
                        launch: this.season.launch,
                        order:this.season.order,
                        active: this.season.active,
                        author:this.season.author,
                        status:this.season.status,
                        studio:this.season.studio,
                        numberEpisodes: this.season.numberEpisodes,

                  })
                      .then(() => {
                      this.closeModals();
                      this.showLoad = false
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
              // image: this.anime.image,
              // imageBanner: this.anime.imageBanner,
              active: this.anime.active,
              activeSeason: this.anime.activeSeason,
              release: this.anime.release,
              closure:this.anime.closure,
              movies:this.anime.movies,
              seasons:this.anime.seasons,
              ovas:this.anime.ovas,
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
  
  <style>
  
  </style>