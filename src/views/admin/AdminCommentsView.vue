<template>
  <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
    <AdminHeader :openModal="openAddModal" local="categories"/>

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
                  name anime - season
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
                  user
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
              <tr class="border-b" v-for="(comment, index) in comments" :key="index">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ comment.animeName }} - {{ comment.season }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                >
                {{ comment.comment.substr(0, 50) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ comment.user }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ comment.active }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center"
                >
                  
                  <button
                    class="btn"
                    :data-id="ids[index]"
                    :data-name="comment.name"
                    :data-commentary="comment.commentary"
                    :data-image="comment.season"
                    :data-active="comment.active"
                    @click="openUpdateModal"
                  >
                    Edit
                  </button>
                  <!-- <button
                    class="btn"
                    :data-id="ids[index]"
                    @click="deleteItem"
                  >
                    Delete
                  </button> -->
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
              v-model="comment.active"
              class="block"
            />
            <br />
          </div>
          
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
        >
          
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
      addModal: false,
      updateModal: false,
      comments:[],
      nameModal:"",
      comment: {
        id:"",
        name: "",
        commentary: "",
        season: "",
        user: "",
        active: false,
      },
      ids:[]
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
      this.comment.id = '';
      this.comment.active = false;
    },
    setItems(ev){
      this.comment.id = ev.target.dataset.id;
      this.comment.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
    },


    getData(){
      
      
      let ref = firebase.database().ref('comments');
      ref.orderByValue().on("value", (snapshot) => {
        this.comments = []
        this.ids = []
        snapshot.forEach((ss) => {
            this.comments.push(ss.val());
            this.ids.push(ss.key);
        });
        this.showload = false;
      });
    },
    addItem() {
        this.showload = true;
        firebase
            .storage()
            .ref('categories')
            .child(this.category.name)
            .child(this.$refs.fileImage.files[0].name)
            .put(this.$refs.fileImage.files[0])
            .then((res) => {
            res.ref
                .getDownloadURL()
                .then((image) => {
                this.category.image = image;
            }).then(() => {
                let ref = firebase.database().ref('categories');
                ref
                    .push({
                    name: this.category.name,
                    description: this.category.description,
                    image: this.category.image,
                    active: this.category.active,
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
    },
    updateItem() {
      let ref = firebase.database().ref("comments").child(this.comment.id);
          ref.update({
              active: this.comment.active,
          }).then(() => {
              this.closeModals();
              this.showLoad = false
              
          }).catch((err) => {
              console.log(err);
          });
    },
    deleteItem(ev) {
      let ref = firebase.database().ref("categories");
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