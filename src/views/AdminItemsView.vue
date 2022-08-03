<template>
  <div class="flex flex-col">
    <header class="text-gray-600 body-font bg-blue-500">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span class="ml-3 text-xl">{{$route.params.item}}</span>
            </a>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4" @click="openAddModal">Add</button>
            <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            </nav>
            <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" @click="$router.go(-1)">Back
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
            </button>
        </div>
    </header>

    <div class="overflow-x-auto container mx-auto">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="border-b">
            <tr>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                id
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                image
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                name
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                description
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                operations
              </th>
            </tr>
          </thead>
         
          <tbody>
            <tr class="border-b" v-for="(anime,index) in animes" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ids[index]}}
                </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                <img :src="anime.image" :alt="anime.image" class="w-40 h-full object-cover mx-auto">
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{anime.name}}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{anime.description.substr(0, 50)}}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap gap-2 flex items-center justify-center">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" :data-id="ids[index]" :data-name="anime.name" :data-description="anime.description" :data-image="anime.image" @click="openUpdateModal">Edit</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" :data-id="ids[index]"  @click="deleteItem">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  

<!-- Main modal -->
<div id="defaultModal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-black" aria-modal="true" role="dialog" v-if="addModal || updateModal">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-100">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal" @click="closeModals">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
                <div class="relative mb-4">
                    <label for="name" class="leading-7 text-sm text-gray-600 block text-left">Name</label>
                    <input type="text" id="name" name="name" v-model="anime.name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
                <div class="relative mb-4">
                    <label for="description" class="leading-7 text-sm text-gray-600 block text-left">Description</label>
                    <textarea id="description" name="description" v-model="anime.description" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <div class="relative mb-4">
                    <label for="image" class="leading-7 text-sm text-gray-600 block text-left">Image</label>
                    <input type="file" id="image" name="image" ref="fileImage" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                </div>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button v-show="addModal" data-modal-toggle="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="addItem">Add</button>
                <button v-show="updateModal" data-modal-toggle="defaultModal" type="button" class="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="updateItem">Update</button>
            </div>
        </div>
    </div>
</div>
<div v-show="showload" class="load w-screen h-screen fixed top-0 lef -inset-0 z-50 bg-gray-600 flex items-center justify-center">
  <span class="text-white text-lg ">
    CARREGANDO...
  </span>
</div>
</div>
</template>
<script>
import firebase from 'firebase';
export default {
    name: 'HomeView',
    data() {
        return {
            showload:true,
            addModal: false,
            updateModal:false,
            anime:{
                id: '',
                name:'',
                description:'',
                image:'',
                file:''
            },
            animes:[],
            ids:[]
        }
    },
  methods:{
    closeModals(){
      this.addModal= false
      this.updateModal = false
    },
    openAddModal(){
      this.addModal= true
      this.updateModal = false
      this.anime.name=''
      this.anime.description=''
      this.anime.image=''
    },
    openUpdateModal(ev){
      this.addModal= false
      this.updateModal = true
      this.anime.id = ev.target.dataset.id
      this.anime.name= ev.target.dataset.name
      this.anime.description= ev.target.dataset.description
    },
    resetItems(){
        this.anime.name=''
        this.anime.description=''
        this.anime.image=''
        this.addModal = false
        this.updateModal = false
        this.animes = []
        this.ids = []
        this.getData()
    },
    getData(){
        let ref = firebase.database().ref(this.$route.params.item);
        ref.orderByValue().on('value', (snapshot) => {
            snapshot.forEach((ss)=>{
                this.animes.push(ss.val())
                this.ids.push(ss.key)
            })
            this.showload = false
        });
    },
    addItem(){
        this.showload = true
        firebase.storage()
        .ref(this.$route.params.item).child(this.anime.name)
        .child(this.$refs.fileImage.files[0].name).put(this.$refs.fileImage.files[0])
        .then((res)=>{
          res.ref.getDownloadURL()
          .then((image)=>{
            this.anime.image = image
          })
          .then(()=>{
            let ref = firebase.database().ref(this.$route.params.item);
            ref.push ({
                name: this.anime.name,
                description: this.anime.description,
                image:this.anime.image
            })
            .then(()=>{
                this.resetItems()
            })
            .catch((err)=>{
              console.log(err)
            })
          })
          .catch((err)=>{
            console.log(err)
          })
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    updateItem(){
      this.showload = true
      if(this.$refs.fileImage.files[0]){
        firebase.storage()
        .ref(this.$route.params.item).child(this.anime.name)
        .child(this.$refs.fileImage.files[0].name).put(this.$refs.fileImage.files[0])
        .then((res)=>{
          res.ref.getDownloadURL()
          .then((image)=>{
            this.anime.image = image
          })
          .then(()=>{
            
            let ref = firebase.database().ref(this.$route.params.item).child(this.anime.id);
            ref.update ({
                name: this.anime.name,
                description: this.anime.description,
                image:this.anime.image
            })
            .then(()=>{
                this.resetItems()
            })
            .catch((err)=>{
              console.log(err)
            })
          })
          .catch((err)=>{
            console.log(err)
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      }else {
        let ref = firebase.database().ref(this.$route.params.item).child(this.anime.id);
            ref.update ({
                name: this.anime.name,
                description: this.anime.description,
            })
            .then(()=>{
                this.resetItems()
            })
            .catch((err)=>{
              console.log(err)
            })
      }
    },

    editItem(ev){
        console.log(ev)
    },
    deleteItem(ev){
        let ref = firebase.database().ref(this.$route.params.item);
        ref.child(ev.target.dataset.id).remove()
        .then(()=>{
            this.resetItems()
        });
        
    }
  },
  created(){
    this.getData()
  },
  mounted(){
    
  }
}
</script>
