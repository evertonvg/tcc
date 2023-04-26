<template>
    <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
      <AdminHeader :openModal="openAddModal" local="seasons"/>
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
                   Title
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
                    tags
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
                    Data
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Att
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
                <tr class="border-b" v-for="(season, index) in seasons" :key="index" v-show="season.title.toLowerCase().includes(search.toLowerCase()) || season.description.toLowerCase().includes(search.toLowerCase())  || search==''">
                  
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.title}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.description.substr(0, 50)}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{ season.tags }}
                  </td>
                 
                    
                  <td
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                  >
                    <img
                      :src="season.image"
                      :alt="season.title"
                      class="w-40 h-full object-cover mx-auto"
                    />
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.data}}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                    {{season.updated}}
                  </td>
                  
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ season.active }}
                  </td>
                  
                  <td class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center">
                    <button
                      class="btn"
                      :data-index="index"
                      :data-id="ids[index]"
                      :data-title="season.title"
                      :data-description="season.description"
                      :data-image="season.image"
                      :data-data="season.data"
                      :data-active="season.active"
                      :data-tags="season.tags"
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
                  >Title
                  </label
                >
                <input
                  type="text"
                  id="name"
                  name="name"
                  v-model="season.title"
                  :class="[
                    'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                  ]"
                />
              </div>
              <div class="relative mb-4">
                <label for="name" class="leading-7 text-sm text-gray-600 block text-left"
                  >Description
                  </label
                >
                <QuillEditor :toolbar="optionsToolbar"   theme="snow"  contentType="html"  v-model:content="season.description" />
                
         
              </div>
              <div class="relative mb-4">
                <label for="videos" class="leading-7 text-sm text-gray-600 block text-left w-full"
                  >tags 
                  <span class="rounded-full w-11 h-11 p-1 bg-blue text-white cursor-pointer" @click="addField">+</span>
                  <span class="rounded-full w-11 h-11 p-1 bg-blue text-white cursor-pointer ml-4" @click="removeField">-</span>
                  </label
                >
              <div v-for="(n,index) in season.tags.length" :key="index" class="flex gap-2">
                <input  ref="tag"
                    type="text"
                    id="videos"
                    name="videos"
                    v-model="season.tags[index]"
                    placeholder="insira o nome da tag"
                    :class="[
                    'w-full mb-4 block bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
                    ]"
                />
                
              </div>
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


              <div class="relative mb-4" v-show="updateModal">
              <label for="active" class="leading-7 text-sm text-gray-600 block text-left"
                >active</label
              >
              <input
                type="checkbox"
                class="block"
                id="active"
                name="active"
                v-model="season.active"
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
  import { QuillEditor } from '@vueup/vue-quill'
  import BlotFormatter from 'quill-blot-formatter'
  // import htmlEditButton from "quill-html-edit-button";
  
import '@vueup/vue-quill/dist/vue-quill.snow.css';
  export default {
    components: { AdminHeader,QuillEditor },
    setup: () => {
    const modules = {
      name: 'blotFormatter',  
      module: {
        BlotFormatter, 
      }, 
      options: {
        /* options */
      }
    }
    return { modules }
  },
    data() {
      return {
        search:'',
        videos:[{
          name:'',
          link:''
        }],
        tags:[],
        showLoad: true,
        addModal: false,
        updateModal: false,
        seasons:[],
        nameModal:"",
        season: {
          id:"",
          title: "",
          description:"aa",
          data: "",
          active:false,
          image:'',
          tags:[]
  
        },
        optionsToolbar:[
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image','video'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
],
        ids:[],
        animessActive:[],
        animesIds:[]
      }
    },
    methods:{
        addField(){
            this.season.tags.push('')
        },
        removeField(){
            this.season.tags.pop()
            if(this.season.tags.lenght<1){
              this.season.tags.push('')
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
        // 
        if(this.seasons[ev.target.dataset.index].videos){
          this.videos = this.seasons[ev.target.dataset.index].videos
          
          
        }else{
          this.videos = [{
              name:'',
              link:''
            }]
        }
        
      },
      closeModals() {
        this.addModal = false;
        this.updateModal = false;
        
      },
      resetItems() {
        this.videos = [{
          name:'',
          link:''
        }]
        this.season.id = "",
        this.season.title = "";
        this.season.description = "",
        this.season.data = "";
        this.season.active = false;
        this.season.image = '',
        this.season.tags = []
      },
      setItems(ev){
        this.season.tags = ev.target.dataset.tags ? ev.target.dataset.tags.split(',') : [],
        this.season.id = ev.target.dataset.id,
        this.season.title = ev.target.dataset.title;
        this.season.description = ev.target.dataset.description;
        this.season.data = ev.target.dataset.data;
        this.season.image = ev.target.dataset.image;
        this.season.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
      },
        setAnimeId(ev){
            // this.season.animeId = ev.target.dataset.animeId;
            this.season.idAnime = ev.target.selectedOptions[0].dataset.id
        },    
            
      getData(){
        let ref = firebase.database().ref('news');
        ref.orderByChild("name").on("value", (snapshot) => {
          this.seasons = []
          this.ids = []
          snapshot.forEach((ss) => {
              this.seasons.push(ss.val());
              this.ids.push(ss.key);
          });
          this.showload = false;
        });
  
  
      },
      addItem() {
        let data = new Date().toString()
        let ref = firebase.database().ref('news');
                  ref.push({
                        title: this.season.title,
                        description: this.season.description,
                        data: data,
                        active: this.season.active,
                        tags: this.season.tags,
                        updated:'',
                        image:'',
                        slug:this.season.title.toString().toLowerCase().replaceAll(' ','-').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""),
                  })
                      .then((res) => {
                      this.closeModals();
                      this.showLoad = false
                        
                      let reference = res
                      
                      if(this.$refs.fileImage.files[0]) {
                          firebase.storage()
                                .ref("news")
                                .child(this.$refs.fileImage.files[0].name)
                                .put(this.$refs.fileImage.files[0])
                                .then((res) => {
                                  res.ref.getDownloadURL()
                                  .then((imageb) => {
                                    let img = imageb;
                                    let ref = firebase.database().ref("news").child(reference._delegate._path.pieces_[1]);
                                    ref.update({
                                      image: img,
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
                  })
                      .catch((err) => {
                      console.log(err);
                  });
    
      },
      updateItem() {
        let data = new Date().toString()
        let ref = firebase.database().ref("news").child(this.season.id);
        ref.update({
          title: this.season.title,
          description: this.season.description,
          data: this.season.data,
          updated:data,
          active: this.season.active,
          image:this.season.image,
          tags:this.season.tags,
          slug:this.season.title.toString().toLowerCase().replaceAll(' ','-').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ""),
        }).then(() => {
            this.closeModals();
            this.showLoad = false


            if(this.$refs.fileImage.files[0]) {
                          firebase.storage()
                                .ref("news")
                                .child(this.$refs.fileImage.files[0].name)
                                .put(this.$refs.fileImage.files[0])
                                .then((res) => {
                                  res.ref.getDownloadURL()
                                  .then((imageb) => {
                                    let img = imageb;
                                    let ref = firebase.database().ref("news").child(this.season.id);
                                    ref.update({
                                      image: img,
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
        })
            .catch((err) => {
            console.log(err);
        });
        
      },
      deleteItem(ev) {
        let ref = firebase.database().ref("news");
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