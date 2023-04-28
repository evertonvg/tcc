<template>
  <header class="bg-lightblue relative h-[30vh] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden  from-transparent to-header" :style="[user.banner ? `background-image: url(${user.banner})` : '']" ref="bannertop">
    <div class="absolute bottom-0 left-0  flex items-center justify-center bg-black bg-opacity-60 w-full h-full cursor-pointer flex-col" @click="$refs.bannerinput.click()" v-show="editActive">
"     <upload :size="70" fillColor="#FFF" class="animate-bounce" />
      <span class="max-w-[100px] text-white text-xs md:text-sm">
        Clique aqui para inserir uma imagem no banner
      </span>
      <input type="file" hidden ref="bannerinput" v-on:change="previewFilesBanner" />
    </div>"
  </header>
  <div class="container mx-auto mt-20 pb-20 -translate-y-32 md:-translate-y-48">
      <section class="container mx-auto mt-4  flex flex-col md:flex-row items-stretch justify-center gap-8">
        <div class="w-36 h-36 md:h-72 md:w-72 overflow-hidden rounded-full mx-auto relative">
          <div class="absolute bottom-0 left-0  flex items-center justify-center bg-black bg-opacity-60 w-full h-full cursor-pointer flex-col" @click="$refs.profileinput.click()" v-show="editActive">
            <upload :size="70" fillColor="#FFF" class="animate-bounce" />
            <span class="max-w-[100px] text-white text-xs md:text-sm">
              Clique aqui para inserir uma imagem de perfil
            </span>
            <input type="file" hidden ref="profileinput" v-on:change="previewFilesprofile" />
          </div>
          <img :src="user.image" :alt="user.name" class="h-full w-full object-cover " ref="profiletop"/>
        </div>
        <div class="flex-1 bg-white rounded p-4 flex flex-col mx-5 relative">
          <span class="cursor-pointer absolute -top-10 left-0 flex" v-if="user.idUser == $cookies.get('idUser')"  >
              <edit :size="30" fillColor="#E7711B" title="editar perfil" v-if="!editActive" @click="openEdit"/>
              <closebox :size="30" fillColor="#E7711B" title="fechar edição de perfil" v-show="editActive" @click="closeEdit"  />
              <save :size="30" fillColor="#075E54 " title="salvar edição de perfil" v-show="editActive" @click="closeEdit"  />
          </span>
          <h1 class="font-semibold text-xl md:text-3xl text-graytext mb-2 flex items-center justify-between">
            <span class="text-left py-2" v-show="!editActive">
              {{ user.name }}
            </span>
            <input type="text" v-model="newData.name" v-show="editActive" class="w-full rounded-sm border border-black p-2" />
            

          </h1>
          <p class="text-left text-graytext relative" v-show="!editActive">
            {{ user.bio }}
            
          </p>
          <textarea class="w-full rounded-sm border border-black p-2 flex-1 min-h-[320px]" v-model="newData.bio" v-show="editActive">

          </textarea>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import firebase from "firebase";
  export default {
    data() {
        return {
            user:'',
            editActive:false,
            oldData:{
              name:'',
              image:'',
              bio:'',
              banner:''
            },
            newData:{
              name:'',
              image:'',
              bio:'',
              banner:''
            }
        };
    },
    methods:{
      previewFilesBanner(event){
        const file = event.target.files[0]; // 0 = get the first file
        let url = window.URL.createObjectURL(file);
        this.$refs.bannertop.style.backgroundImage =`url(${url})`
      },
      previewFilesprofile(event){
        const file = event.target.files[0]; // 0 = get the first file
        let url = window.URL.createObjectURL(file);
        this.$refs.profiletop.src = url
      },
      resetImages(){
        this.$refs.profiletop.src = this.oldData.image
        this.$refs.bannertop.style.backgroundImage =`url(${this.oldData.banner})`
      },
      closeEdit(){
        this.editActive = false
        this.resetImages()
        this.resetNewData()
      },
      openEdit(){
        this.editActive = true
        this.setOldldData()
      },
      setOldldData(){
        this.oldData.name = this.user.name
        this.oldData.image = this.user.image
        this.oldData.bio = this.user.bio
        this.oldData.banner = this.user.banner
      },
      setNewData(){
        this.newData.name = this.user.name
        this.newData.image = this.user.image
        this.newData.bio = this.user.bio
        this.newData.banner = this.user.banner
      },
      resetNewData(){
        this.newData.name = this.oldData.name
        this.newData.image = this.oldData.image
        this.newData.bio = this.oldData.bio
        this.newData.banner = this.oldData.banner
      },
        getData(){
            let ref = firebase.database().ref('users');
            ref.orderByChild('slug').equalTo(this.$route.params.slug.split('ososlklk')[0].toString()).limitToFirst(1).on("value", (snapshot) => {
                snapshot.forEach((ss) => {
                    this.user = ss.val();
                    this.user.id = ss.key;
                });
                document.title = `Perfil de ${this.user.name} Otaku Stars`;
                this.$store.commit('SET_LOADING',false)
                console.log(this.$route.params.slug.split('ososlklk')[1])

                if(this.user.length == 0){
                    history.back();
                    setTimeout(()=>{
                        window.location.reload()
                    },100)
                }
          })
        },
    },
    mounted() {
        this.getData()
        window.addEventListener('keydown',(ev)=>{
          if(ev.key == 'Escape')[
            this.closeEdit()
          ]
        })
    },
  };
  </script>
  
  <style></style>
  