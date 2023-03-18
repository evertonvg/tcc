<template>
    <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
      <AdminHeader :openModal="openAddModal" local="categories"/>
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
                    name - idAnime
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
                <tr class="border-b" v-for="(cat, index) in characters" :key="index" v-show="cat.characterName.toLowerCase().includes(search.toLowerCase())" >
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ cat.characterName }} - {{ cat.id }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                  >
                    <img
                      :src="cat.image"
                      :alt="cat.image"
                      class="w-40 h-full object-cover mx-auto"
                    />
                  </td>
  
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ cat.active }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center"
                  >
                    
                    <button
                      class="btn"
                      :data-id="cat.id"
                      :data-anime="cat.anime"
                      :data-name="cat.characterName"
                      :data-description="cat.description"
                      :data-age="cat.age"
                      :data-height="cat.height"
                      :data-weight="cat.weight"
                      :data-history="cat.history"
                      :data-powers="cat.powers"
                      :data-image="cat.image"
                      :data-active="cat.active"
                      :data-phisic="cat.phisic"
                      :data-personality="cat.personality"
                      :data-blood="cat.blood"
                      :data-job="cat.job"
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
                <select
                  id="anime"
                  name="anime"
                  v-model="character.anime"
                  :class="[
                    'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                  ]"
                >
                  <option
                    v-for="(an, ind) in animes"
                    :key="ind"
                    :value="an.id"
                    
                    :data-id="an.id"
                  >
                    {{ an.name }}
                  </option>
                </select>
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Name
                <span class="text-red-900 font-bold">
                  (Nome requerido)</span
                ></label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="character.characterName"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
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
                v-model="character.description"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                  
                ]"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="leading-7 text-sm text-gray-600 block text-left"
                >Aparencia fisica</label>
              <textarea
                id="description"
                name="description"
                v-model="character.phisic"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                  
                ]"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="leading-7 text-sm text-gray-600 block text-left"
                >Personalidade</label>
              <textarea
                id="description"
                name="description"
                v-model="character.personality"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                  
                ]"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="leading-7 text-sm text-gray-600 block text-left"
                >História</label>
              <textarea
                id="description"
                name="description"
                v-model="character.history"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                  
                ]"
              ></textarea>
            </div>
            <div class="relative mb-4">
              <label
                for="description"
                class="leading-7 text-sm text-gray-600 block text-left"
                >Poderes</label>
              <textarea
                id="description"
                name="description"
                v-model="character.powers"
                :class="[
                  `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                  
                ]"
              ></textarea>
            </div>
       
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Emprego
                </label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="character.job"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Peso
                </label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="character.weight"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Aniversario
                </label
              >
              <input
                type="date"
                id="name"
                name="name"
                v-model="character.age"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Altura
                </label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="character.height"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                >Sangue
                </label
              >
              <input
                type="text"
                id="name"
                name="name"
                v-model="character.blood"
                :class="[
                  'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                ]"
              />
            </div>
            <div class="relative mb-4" v-show="updateModal">
              <label
                for="activecat"
                class="leading-7 text-sm text-gray-600 block text-left"
                >active</label
              >
              <input
                type="checkbox"
                id="activecat"
                name="activecat"
                v-model="character.active"
                class="block"
              />
              <br />
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
        showLoad: true,
        animes:[],
        animesIds:[],
        idAnime:'',
        search:'',
        addModal: false,
        updateModal: false,
        categories:[],
        nameModal:"",
        character: {
            id:"",
            anime:"",
            characterName: "",
            description: "",
            active: false,
            image: "",
            phisic:"",
            age:"",
            height:"",
            blood:"",
            weight:"",
            job:"",
            personality:'',
            history:'',
            powers:'',
        },
        ids:[]
      }
    },
    methods:{
    setAnimeId(ev){
        this.idAnime = ev.target.selectedOptions[0].dataset.id
    },
      openAddModal(){
        this.addModal = true,
        this.nameModal = 'Adicionar personagem'
        this.resetItems();
      },
      openUpdateModal(ev){
        this.updateModal = true
        this.nameModal = 'Editar Personagem'
        this.setItems(ev);
      },
      closeModals() {
        this.addModal = false;
        this.updateModal = false;
        
      },
      resetItems() {
        this.character.id = "",
        this.character.anime = "";
        this.character.description = "";
        this.character.characterName = "";
        this.character.phisic = "";
        this.character.age = "";
        this.character.height = "";
        this.character.blood = "";
        this.character.weight = "";
        this.character.job = "";
        this.character.personality = '';
        this.character.history = '';
        this.character.powers = '';
        this.character.active = false;
        this.character.image = ''
        
      },
      setItems(ev){

        this.character.anime = ev.target.dataset.anime;
        this.character.phisic = ev.target.dataset.phisic;
        this.character.age = ev.target.dataset.age;
        this.character.height = ev.target.dataset.height;
        this.character.blood = ev.target.dataset.blood;
        this.character.weight = ev.target.dataset.weight;
        this.character.job = ev.target.dataset.job;
        this.character.personality = ev.target.dataset.personality;
        this.character.history = ev.target.dataset.history;
        this.character.powers = ev.target.dataset.powers;

        this.character.id = ev.target.dataset.id.toString(),
        this.character.characterName = ev.target.dataset.name.toString();
        this.character.description = ev.target.dataset.description.toString();
        this.character.image = ev.target.dataset.image.toString();
        this.character.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
      },


      getData(){
        
        
        let ref = firebase.database().ref('characters');
        ref.orderByValue().on("value", (snapshot) => {
          this.characters = []
          this.ids = []
          snapshot.forEach((ss) => {
              this.characters.push(ss.val());
              this.ids.push(ss.key);
          });
            this.characters.forEach((el,ind)=>{
                el.id = this.ids[ind]
            })
          this.showload = false;
        });

        let animes = firebase.database().ref("animes");
        animes.orderByChild("name").on("value", (snapshot) => {
            this.animes = [];
            this.animesIds = [];
            snapshot.forEach((ss) => {
                this.animes.push(ss.val());
                this.animesIds.push(ss.key);
            });
            this.animes.forEach((el,ind)=>{
                el.id = this.animesIds[ind]
            })
        });
      },
      addItem() {
          this.showload = true;
          firebase
              .storage()
              .ref('characters')
              .child(this.character.characterName)
              .child(this.$refs.fileImage.files[0].name)
              .put(this.$refs.fileImage.files[0])
              .then((res) => {
              res.ref
                  .getDownloadURL()
                  .then((image) => {
                  this.character.image = image;
              }).then(() => {
                  let ref = firebase.database().ref('characters');
                  ref.push({                      
                        characterName: this.character.characterName,
                        description: this.character.description,
                        image: this.character.image,
                        anime: this.character.anime,
                        active: this.character.active,
                        phisic: this.character.phisic,
                        height: this.character.height,
                        age: this.character.age,
                        blood: this.character.blood,
                        weight: this.character.weight,
                        job: this.character.job,
                        personality: this.character.personality,
                        history: this.character.history,
                        powers: this.character.powers,

                  }).then(() => {
                      this.closeModals();
                      this.showLoad = false
                  }).catch((err) => {
                      console.log(err);
                  });
              })
                  .catch((err) => {
                  console.log(err);
              });
          })
              .catch((err) => {
              console.log(err);
          });
      },
      updateItem() {
        if (this.$refs.fileImage.files[0]) {
            firebase.storage()
                .ref("characters")
                .child(this.character.characterName)
                .child(this.$refs.fileImage.files[0].name)
                .put(this.$refs.fileImage.files[0])
                .then((res) => {
                res.ref
                    .getDownloadURL()
                    .then((image) => {
                    this.character.image = image;
                }).then(() => {
                        let ref = firebase.database().ref("characters").child(this.character.id);
                        ref.update({
                            characterName: this.character.characterName,
                            description: this.character.description,
                            image: this.character.image,
                            anime: this.character.anime,
                            active: this.character.active,
                            phisic: this.character.phisic,
                            height: this.character.height,
                            age: this.character.age,
                            blood: this.character.blood,
                            weight: this.character.weight,
                            job: this.character.job,
                            personality: this.character.personality,
                            history: this.character.history,
                            powers: this.character.powers,
                        })
                        .then(() => {
                            this.closeModals();
                            this.showLoad = false
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
                .catch((err) => {
                console.log(err);
            });
        }
        else {
            let ref = firebase.database().ref("characters").child(this.character.id);
            ref.update({
                characterName: this.character.characterName,
                description: this.character.description,
                image: this.character.image,
                anime: this.character.anime,
                active: this.character.active,
                phisic: this.character.phisic,
                height: this.character.height,
                age: this.character.age,
                blood: this.character.blood,
                weight: this.character.weight,
                job: this.character.job,
                personality: this.character.personality,
                history: this.character.history,
                powers: this.character.powers,
            }).then(() => {
                this.closeModals();
                this.showLoad = false
                
            }).catch((err) => {
                console.log(err);
            });
        }
      },
      deleteItem(ev) {
        let ref = firebase.database().ref("characters");
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