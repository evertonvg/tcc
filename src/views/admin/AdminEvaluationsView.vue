<template>
  <section class="flex flex-col" style="background: linear-gradient(to right, #ED8263, #F9CE7C);">
    <AdminHeader :openModal="openAddModal" local="categories"/>

    <div class="overflow-x-auto container mx-auto bg-white ">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
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
                  description
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
              <tr class="border-b" v-for="(cat, index) in categories" :key="index">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ cat.name }}
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
                  {{ cat.description.substr(0, 50) }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ cat.active }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 h-full py-4 whitespace-nowrap gap-2 flex items-center justify-center"
                >
                  <router-link
                    class="btn"
                    :data-id="ids[index]"
                    :to="`/categories/${cat.name.toString().replaceAll(' ','-').toLowerCase()}`"
                  >Visit
                  </router-link>
                  <button
                    class="btn"
                    :data-id="ids[index]"
                    :data-name="cat.name"
                    :data-description="cat.description"
                    :data-image="cat.image"
                    :data-active="cat.active"
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
              <span class="text-red-900 font-bold">
                (Nome requerido)</span
              ></label
            >
            <input
              type="text"
              id="name"
              name="name"
              v-model="category.name"
              :class="[
                'w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out',
              ]"
            />
          </div>
          <div class="relative mb-4">
            <label
              for="description"
              class="leading-7 text-sm text-gray-600 block text-left"
              >Description></label
            >
            <textarea
              id="description"
              name="description"
              v-model="category.description"
              :class="[
                `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                
              ]"
            ></textarea>
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
              v-model="category.active"
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
      addModal: false,
      updateModal: false,
      categories:[],
      nameModal:"",
      category: {
        id:"",
        name: "",
        description: "",
        image: "",
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
      this.category.id = "",
      this.category.name = "";
      this.category.description = "";
      this.category.image = "";
      this.category.active = false;
    },
    setItems(ev){
      this.category.id = ev.target.dataset.id.toString(),
      this.category.name = ev.target.dataset.name.toString();
      this.category.description = ev.target.dataset.description.toString();
      this.category.image = ev.target.dataset.image.toString();
      this.category.active = ev.target.dataset.active == 'true' ? true : ev.target.dataset.active == true? true : false;
    },


    getData(){
      
      
      let ref = firebase.database().ref('categories');
      ref.orderByValue().on("value", (snapshot) => {
        this.categories = []
        this.ids = []
        snapshot.forEach((ss) => {
            this.categories.push(ss.val());
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
      if (this.$refs.fileImage.files[0]) {
          firebase.storage()
              .ref("categories")
              .child(this.category.name)
              .child(this.$refs.fileImage.files[0].name)
              .put(this.$refs.fileImage.files[0])
              .then((res) => {
              res.ref
                  .getDownloadURL()
                  .then((image) => {
                  this.category.image = image;
              }).then(() => {
                      let ref = firebase.database().ref("categories").child(this.category.id);
                      ref.update({
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
      }
      else {
          let ref = firebase.database().ref("categories").child(this.category.id);
          ref.update({
              name: this.category.name,
              description: this.category.description,
              active: this.category.active,
          }).then(() => {
              this.closeModals();
              this.showLoad = false
              
          }).catch((err) => {
              console.log(err);
          });
      }
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

<style scoped>
  *{
    font-weight: bold;
  }
</style>