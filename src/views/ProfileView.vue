<template>
  <header :class="['bg-lightblue relative h-[320px] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden  from-transparent to-header bannertop']" :style="`background-image:url('${userData.banner}`">
    <div class="absolute bottom-0 left-0  flex items-center justify-center bg-black bg-opacity-60 w-full h-full cursor-pointer flex-col" @click="$refs.bannerinput.click()" v-show="editActive">
"     <upload :size="40" fillColor="#FFF" class="animate-bounce" />
      <span class="max-w-[100px] mb-0 sm:mb-14 lg:mb-0 text-white text-xs md:text-sm">
        Clique aqui para inserir uma imagem no banner
      </span>
      <input type="file" class="bannerinput" hidden ref="bannerinput" v-on:change="previewFilesBanner" />
    </div>"
  </header>
  <div class="container mx-auto mt-20 pb-20 -translate-y-32 md:-translate-y-48">
      <section class="container mx-auto mt-4  flex flex-col md:flex-row items-stretch justify-center gap-8">
        <div class="w-36 h-36 md:h-72 md:w-72 overflow-hidden rounded-full mx-auto relative">
          <div class="absolute bottom-0 left-0  flex items-center justify-center bg-black bg-opacity-60 w-full h-full cursor-pointer flex-col" @click="$refs.profileinput.click()" v-show="editActive">
            <upload :size="40"  fillColor="#FFF" class="animate-bounce" />
            <span class="max-w-[100px] text-white text-xs md:text-sm">
              Clique aqui para inserir uma imagem de perfil
            </span>
            <input type="file" class="profileinput" hidden ref="profileinput" v-on:change="previewFilesprofile" />
          </div>
          <img :alt="userData.name" :src="userData.image" class="h-full w-full object-cover profiletop" ref="profiletop"/>
        </div>


        <!-- parte branca  -->
        <div class="flex-1 bg-white rounded p-4 flex flex-col mx-5 relative">
          <span class="cursor-pointer absolute top-4 right-4 flex" v-if="userData.idUser == $cookies.get('idUser')"  >
              <edit :size="30" fillColor="#E7711B" title="editar perfil" v-if="!editActive" @click="openEdit"/>
              <save :size="30" fillColor="#075E54 " title="salvar edição de perfil" v-show="editActive" @click="updateProfile"  />
              <closebox :size="34" fillColor="#E7711B" title="fechar edição de perfil" v-show="editActive" @click="closeEdit"  />
          </span>
          <h1 class="font-semibold text-xl md:text-3xl text-graytext mb-2 flex items-start justify-between flex-col">
            <span class="text-left py-2" v-show="!editActive">
              {{ userData.name }}
            </span>
            <label for="nome" v-show="editActive" class="text-xs text-lightblue mb-1 mt-6">
              NOME:
            </label>
            <input autocomplete="off" :placeholder="`Digite seu nome aqui (máximo de ${limitName} caracteres)`" :maxlength="limitName" id="nome" type="text" v-model="newData.name" v-show="editActive" class="text-lg w-full rounded-sm border border-black p-2" />
            <span v-show="editActive" :class="['text-xs  pl-2', newData.name.length == limitName ? 'text-red' : 'text-lightblue']">
              {{ newData.name.length }} / {{ limitName }}
            </span>

          </h1>
          <div class="flex items-start justify-between flex-col">
            <span class="text-xs text-lightblue mb-1 flex items-center justify-start" v-show="!editActive">
              <island :size="20" fillColor="#ACC5EC" class="mr-2" /> {{ userData.location }}
            </span>
            <label for="location" v-show="editActive" class="text-xs text-lightblue mb-1">
              LOCALIZAÇÃO:
            </label>
            <input autocomplete="off" :maxlength="limitplace" :placeholder="`Digite sua localização aqui. Maximo de ${limitplace} caracteres`" id="location" type="text" v-model="newData.location" v-show="editActive" class="text-lg w-full rounded-sm border border-black p-2" />
            <span v-show="editActive" :class="['text-xs  pl-2', newData.location.length == limitplace ? 'text-red' : 'text-lightblue']">
              {{ newData.location.length }} / {{ limitplace }}
            </span>
          </div>
          <div class="flex items-start justify-between flex-col mt-2">
            <p class="text-left text-graytext relative" v-show="!editActive">
              {{ userData.bio }}
              
            </p>
            <label for="bio" v-show="editActive" class="text-xs text-lightblue mb-1">
                BIO:
              </label>
            <textarea autocomplete="off"  id="bio" :maxlength="limitBio" :placeholder="`Digite sua bio aqui. Maximo de ${ limitBio } caracteres.`" class="w-full rounded-sm border border-black p-2 flex-1 min-h-[120px]" v-model="newData.bio" v-show="editActive">

            </textarea>
            <span v-show="editActive" :class="['text-xs  pl-2', newData.bio.length == limitBio ? 'text-red' : 'text-lightblue']">
              {{ newData.bio.length }} / {{ limitBio }}
            </span>
          </div>
          
        </div>
      </section>

      <div  :class="['mx-5 pt-4 flex gap-3 items-center justify-start']" v-show="editActive==false">
        <button class="btn" :class="activetab=='favorites' ? 'bg-blue hover:bg-darkblue' : ''" v-show="favorites.length" @click="activetab='favorites'">
          Favoritos
        </button>
        <button class="btn" :class="activetab=='progress' ? 'bg-blue hover:bg-darkblue' : ''" v-show="progress.length" @click="activetab='progress'">
          Progresso
        </button>
        <button class="btn" :class="activetab=='notes' ? 'bg-blue hover:bg-darkblue' : ''" v-show="notes.length" @click="activetab='notes'">
          Avaliações
        </button>
      </div>

      <transition-group name="fade">
        <section v-show="favorites.length && activetab=='favorites' && editActive==false" class="mx-5">
          <div class="container mx-auto p-5 bg-white mt-4 ">
            <h2 class="text-left text-2xl font-bold pb-6">Favoritos de {{userData.name}}</h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-4">
              <router-link v-for="(fav,index) in favorites" :key="index" :to="`/animes/${fav.animeLink}`" class="h-12 bg-gray flex items-center justify-start gap-2">
                <div class="h-full w-12">
                  <img :src="fav.animeImage" :alt="fav.animeName" class="w-full h-full object-cover"/>
                </div>
                <span class="text-black text-left flex-1">
                  {{ fav.animeName }}
                </span>
              </router-link>
            </div>
          </div>
        </section>

        
        <section v-show="progress.length && activetab=='progress'  && editActive==false" class="mx-5">
          <div class="container mx-auto p-5 bg-white mt-4 overflow-x-scroll sm:overflow-x-hidden">
            <h2 class="text-left text-2xl font-bold pb-6">Progresso de {{userData.name}}</h2>
            <div class="flex items-center justify-center mb-3 h-12  bg-gray gap-2 w-[160%] sm:w-full">
              <div class="w-12"></div>
              <div class="text-black text-center flex-1">Anime</div>
              <div class="text-black text-left w-28 ">Tipo</div>
              <div class="text-black text-left flex-1">Título</div>
              <div class="text-black w-24 flex items-center justify-center">Progresso</div>
              <div class="text-black w-32  flex items-center justify-center">Status</div>
            </div>
            <div class="grid grid-cols-1 gap-1 w-[160%] sm:w-full">
              <router-link v-for="(prog,index) in progress" :key="index" :to="`/animes/${prog.slugName}?temp=${prog.temporada}`" class="h-12 bg-gray flex items-center justify-start gap-2">
                <div class="h-full">
                  <img :src="prog.imageAnime" :alt="prog.nameAnime" class="w-full h-full object-cover"/>
                </div>
                <span class="text-black text-left flex-1 pl-1 hidden sm:block">
                  {{ prog.nameAnime }}
                </span>
                <span class="text-black text-left flex-1 pl-1 block sm:hidden">
                  {{ prog.nameAnime.substr(0, 10) }}
                </span>
                <span class="text-black text-left w-28">
                  {{ prog.type }}
                </span>
                <span class="text-black text-left flex-1 pl-1 hidden sm:block">
                  {{ prog.nameTemporada }}
                </span>
                <span class="text-black text-left flex-1 pl-1 block sm:hidden">
                  {{ prog.nameTemporada.substr(0, 10) }}
                </span>
                <span class="text-black text-center w-24">
                  {{ prog.progressEpisode}}
                </span>
                <span class="text-black text-center w-32">
                  {{ prog.statustemp }}
                </span>
                
              </router-link>
            </div>
          </div>
        </section>


        <section v-show="notes.length && activetab=='notes'  && editActive==false" class="mx-5">

          <div class="container mx-auto p-5 bg-white mt-4 overflow-x-scroll sm:overflow-x-hidden">
            <h2 class="text-left text-2xl font-bold pb-6">Notas de {{userData.name}}</h2>
            <div class="flex items-center justify-center mb-3 h-12  bg-gray gap-2 w-[160%] sm:w-full">
              <div class="w-12"></div>
              <div class="text-black text-center flex-1">Anime</div>
              <div class="text-black text-left w-28 ">Tipo</div>
              <div class="text-black text-left flex-1">Título</div>
              <div class="text-black w-10 flex items-center justify-center"><graphic title="animação" fillColor="#E7711B" :size="20"></graphic></div>
              <div class="text-black w-6 sm:w-10 flex items-center justify-center"> <history title="historia" fillColor="#E7711B" :size="20"></history></div>
              <div class="text-black w-6 sm:w-10 flex items-center justify-center"><person title="Personagens" fillColor="#E7711B" :size="20"></person></div>
              <div class="text-black w-6 sm:w-10 flex items-center justify-center"> <music title="trilha sonora" fillColor="#E7711B" :size="20"></music></div>
            </div>
            <div class="grid grid-cols-1 gap-1 w-[160%] sm:w-full">
              <router-link v-for="(note,index) in notes" :key="index" :to="`/animes/${note.animeLink}?temp=${note.season}`" class="h-12 bg-gray flex items-center justify-start gap-2">
                <div class="h-full">
                  <img :src="note.animeImage" :alt="note.animeName" class="w-full h-full object-cover"/>
                </div>
                <span class="text-black text-left flex-1 pl-1 hidden sm:block">
                  {{ note.animeName }}
                </span>
                <span class="text-black text-left flex-1 pl-1 block sm:hidden">
                  {{ note.animeName.substr(0, 10) }}
                </span>
                <span class="text-black text-left w-28">
                  {{ note.type }}
                </span>
                <span class="text-black text-left flex-1 pl-1 hidden sm:block">
                  {{ note.animeSeasonName }}
                </span>
                <span class="text-black text-left flex-1 pl-1 block sm:hidden">
                  {{ note.animeSeasonName.substr(0, 10) }}
                </span>
                <span class="text-black text-center w-6 sm:w-10">
                  {{ note.animation }}
                </span>
                <span class="text-black text-center w-6 sm:w-10">
                  {{ note.history }}
                </span>
                <span class="text-black text-center w-6 sm:w-10">
                  {{ note.characters }}
                </span>
                <span class="text-black text-center w-6 sm:w-10">
                  {{ note.sound }}
                </span>
                
              </router-link>
            </div>
          </div>
        </section>
    </transition-group>

    </div>
  </template>
  
  <script>
  import firebase from "firebase";
  export default {
    data() {
        return {
          limitBio:360,
          limitplace:20,
          limitName:15,
            userData:{
              name:'',
              image:'',
              bio:'',
              banner:'',
              location:'',
              idUser:''
            },
            user:'',
            favorites:[],
            progress:[],
            notes:[],
            activetab:'favorites',
            loadCountries:false,
            loadStates:false,
            loadCities:false,
            country:'',
            state:'',
            city:'',
            editActive:false,
            countries:[],
            states:[],
            cities:[],
            bannerAtt:'',
            imageAtt:'',
            firstTime:true,
            oldData:{
              name:'',
              image:'',
              bio:'',
              banner:'',
              location:''
            },
            newData:{
              name:'',
              image:'',
              bio:'',
              banner:'',
              location:''
            },
            animes:[],
            seasons:[]
        };
    },
    watch:{
      activetab(){
        this.$router.push(`${this.$route.path}?session=${this.activetab}`)
      }
    },
    methods:{
      async getFavoritesFromUser(){
        
        let refrr = firebase.database().ref('favorites');
        refrr.orderByChild('userId').equalTo(this.$route.params.slug.split('ososlklk')[1].toString()).once("value", (snapshot) => {
            let index = 0

            snapshot.forEach((ss) => {
                this.favorites.push(ss.val())
                if(this.favorites[index]){
                    this.favorites[index].id = ss.key
                    index++
                }
            });
            this.favorites = this.favorites.filter((item)=>{
                  let anime = this.animes.filter((us)=>{
                      return us.id == item.animeId
                  })

                  if(anime[0].active == true){
                      return item
                  }
              })

            this.favorites = this.favorites.sort((x,y)=>{
                let a = x.animeName.toLowerCase()
                let b = y.animeName.toLowerCase()
                return  a == b ? 0 : a > b ? 1 : -1
            })

        }); 
        
      },
      async getprogressFromUser(){
        
        let refrr = firebase.database().ref('progress');
        refrr.orderByChild('idUser').equalTo(this.$route.params.slug.split('ososlklk')[1].toString()).once("value", (snapshot) => {
            let index = 0
            this.progress = []

            snapshot.forEach((ss) => {
                this.progress.push(ss.val())
                if(this.progress[index]){
                    this.progress[index].id = ss.key
                    index++
                }
            });
            let anime,seasons
            this.progress = this.progress.filter((item)=>{
                  anime = this.animes.filter((us)=>{
                      return us.id == item.animeId
                  })

                  if(anime[0].active == true){
                      return item
                  }
            })
            this.progress = this.progress.filter((item)=>{
                  seasons = this.seasons.filter((us)=>{
                    if(us.idAnime.toString() == item.animeId.toString() && us.order.toString() == item.temporada.toString()){
                      return item
                    }    
                  })
                
                  if(seasons[0].active==true)
                  return item

            })
            this.progress = this.progress.sort((x,y)=>{
              return  (x.nameAnime.localeCompare(y.nameAnime) || x.temporada - y.temporada   )
            })

        }); 
        
      },
      getAnimes(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('slug').once("value", (snapshot) => {
                this.animes =  []
                let index = 0
                snapshot.forEach((ss) => {
                    this.animes.push(ss.val())
                    if(this.animes[index]){
                      this.animes[index].id = ss.key
                      index++
                    }
                    
                });
            });
      },
      getSeasons(){
        let ref = firebase.database().ref('seasons');
            ref.orderByChild('name').once("value", (snapshot) => {
                this.seasons =  []
                let index = 0
                snapshot.forEach((ss) => {
                    this.seasons.push(ss.val())
                    if(this.seasons[index]){
                      this.seasons[index].id = ss.key
                      index++
                    }
                    
                });
            });
      },
      async getNotesFromUser(){
        let refrr = firebase.database().ref('evaluations');
        refrr.orderByChild('idUser').equalTo(this.$route.params.slug.split('ososlklk')[1].toString()).once("value", (snapshot) => {
            let index = 0

            snapshot.forEach((ss) => {
                this.notes.push(ss.val())
                if(this.notes[index]){
                    this.notes[index].id = ss.key
                    index++
                }
            });
            let anime,seasons
            this.notes = this.notes.filter((item)=>{
                  anime = this.animes.filter((us)=>{
                      return us.id == item.idAnime
                  })

                  if(anime[0].active == true){
                      return item
                  }
            })
            this.notes = this.notes.filter((item)=>{
                  seasons = this.seasons.filter((us)=>{
                    if(us.idAnime.toString() == item.idAnime.toString() && us.order.toString() == item.season.toString()){
                      return item
                    }    
                  })
                
                  if(seasons[0].active==true)
                  return item

            })
            this.notes = this.notes.sort((x,y)=>{
              return  (x.animeName.localeCompare(y.animeName) || x.season - y.season   )
            })

        });
      },
      async tabStatus(){
        this.activetab = this.favorites.length ? 'favorites' : this.progress.length ? 'progress' : this.notes ? 'notes' : ''
      },
      async getAllDatas(){
        await this.getFavoritesFromUser()
        await this.getprogressFromUser()
        await this.getprogressFromUser()
        await this.getNotesFromUser()
      },

      setPreviewimages(el,input,type){
        let element = document.querySelector(`.${el}`)
        let file = document.querySelector(`.${input}`).files[0]
        let url = window.URL.createObjectURL(file);

        if(element){
          if(type=='banner'){
              element.style.backgroundImage =`url(${url})`
              this.userData.banner = url
          }
          if(type=='image'){
            element.src = url
            this.userData.image = url
          }
        }
        

      },
      previewFilesBanner(event){
        const file = event.target.files[0]; 
        let url = window.URL.createObjectURL(file);
        let bannertop = document.querySelector('.bannertop')
        if(bannertop)
          bannertop.style.backgroundImage =`url(${url})`

        this.bannerAtt = url
      },

      previewFilesprofile(event){
        const file = event.target.files[0]; 
        let url = window.URL.createObjectURL(file);
        let profiletop = document.querySelector('.profiletop')
        if(profiletop)
          profiletop.src = url

        this.imageAtt = url
      },

      resetImages(){
        let bannertop = document.querySelector('.bannertop')
        let profiletop = document.querySelector('.profiletop')
        let profileinput = document.querySelector('.profileinput')
        let bannerinput = document.querySelector('.bannerinput')

        if(profiletop)
          profiletop.src = this.oldData.image
        
        if(bannertop)
          bannertop.style.backgroundImage =`url(${this.oldData.banner})`

        if(profileinput)
          profileinput.value = ''

        if(bannerinput)
          bannerinput.value = ''

      },

      resetInputImage(){
        
        let profileinput = document.querySelector('.profileinput')
        let bannerinput = document.querySelector('.bannerinput')
        if(profileinput)
          profileinput.value = ''

        if(bannerinput)
          bannerinput.value = ''

      },

      closeEditOnSave(){
        this.editActive = false
      },

      closeEdit(){
        this.editActive = false
        this.resetImages()
        this.resetNewData()
      },

      openEdit(){
        this.editActive = true
        this.setNewData()
        this.setOldData()
      },

      setOldData(){
        this.oldData.name = this.userData.name
        this.oldData.image = this.userData.image
        this.oldData.bio = this.userData.bio
        this.oldData.banner = this.userData.banner
        this.oldData.location = this.userData.location
      },

      setNewData(){
        this.newData.name = this.userData.name
        this.newData.image = this.userData.image
        this.newData.bio = this.userData.bio
        this.newData.banner = this.userData.banner
        this.newData.location = this.userData.location
      },

      resetNewData(){
        this.newData.name = this.oldData.name
        this.newData.image = this.oldData.image
        this.newData.bio = this.oldData.bio
        this.newData.banner = this.oldData.banner
        this.newData.location = this.oldData.location
      },

      async getData(){

        let ref = firebase.database().ref('users');
        ref.orderByChild('idUser').equalTo(this.$route.params.slug.split('ososlklk')[1].toString()).limitToFirst(1).once("value", (snapshot) => {
          snapshot.forEach((ss) => {
              this.user = ss.val();
              this.user.id = ss.key;
          });
          this.userData = this.user          
          document.title = `Perfil de ${this.user.name} Otaku Stars`;

          this.getAllDatas()
          
          this.$store.commit('SET_LOADING',false)
          if(this.user.length == 0 ){
              history.back();
              setTimeout(()=>{
                  window.location.reload()
              },100)
          }
          if(this.user.active == false ){
              history.back();
              setTimeout(()=>{
                  window.location.reload()
              },100)
          }
        })
      },

      async save(slug){
        this.closeEditOnSave()
          this.$cookies.set("nameAnime", this.newData.name);
          this.$cookies.set("slugName", slug);
          this.$store.commit('SET_LOADING',false)
          this.$store.commit("SET_MESSAGE",`Seu perfil foi atualizado com sucesso ^^`);
          this.$store.commit("SET_IMAGE_MESSAGE", "welcome");
          this.$router.push(`/profile/${this.newData.name}ososlklk${this.userData.idUser}`)
      },

      async updateProfile(){
        let profileinput,bannerinput
        // let id = this.user.idUser
        let slug = this.newData.name.toString().toLowerCase().replaceAll(' ','-').replaceAll(/'/g, '').replaceAll(/"/g, '').replaceAll(':','-').normalize('NFD').replaceAll(/[\u0300-\u036f]/g, "")
        this.$store.commit('SET_LOADING',true);

        let ref = firebase.database().ref('users').child(this.user.id);
        await ref.update({
          name: this.newData.name,
          bio: this.newData.bio,
          slug:slug,
          location: this.newData.location,
        })
        .then(()=>{
          this.userData.name = this.newData.name
          this.userData.bio = this.newData.bio
          this.userData.location = this.newData.location
        })
  
        .catch((err) => {
          console.log(err);
          this.$store.commit('SET_LOADING',false)
          this.$store.commit("SET_MESSAGE",`Erro ao atualizar o perfil, tente mais tarde`);
          this.$store.commit("SET_IMAGE_MESSAGE", "error");
        });


        bannerinput = document.querySelector('.bannerinput')

        if(bannerinput.files[0]) {
          this.$store.commit('SET_LOADING',true);               

          this.setPreviewimages('bannertop','bannerinput','banner')

          await firebase.storage()
                .ref("users")
                .child(bannerinput.files[0].name)
                .put(bannerinput.files[0])
                .then((res) => {
                  res.ref.getDownloadURL()
                  .then((imageb) => {
                    let img = imageb;
                    let ref = firebase.database().ref("users").child(this.user.id);
                    ref.update({
                      banner: img,
                    })
                  })
                  .then(()=>{
                    this.$store.commit('SET_LOADING',false)
                  })
                  .catch((err) => {
                    this.$store.commit('SET_LOADING',false)
                    this.$store.commit("SET_MESSAGE",`Erro ao atualizar a imagem do banner. Tente novamente mais tarde.`);
                    this.$store.commit("SET_IMAGE_MESSAGE", "error");
                    console.log(err);
                  });
            })
            .catch((err) => {
                console.log(err);
                this.$store.commit('SET_LOADING',false)
                this.$store.commit("SET_MESSAGE",`Erro ao inserir a imagem de banner no sistema. Tente novamente mais tarde.`);
                this.$store.commit("SET_IMAGE_MESSAGE", "error");
            });
        }



          profileinput = document.querySelector('.profileinput')

          if(profileinput.files[0]) {
            this.$store.commit('SET_LOADING',true);
            this.setPreviewimages('profiletop','profileinput','image')
            
            await firebase.storage()
                  .ref("users")
                  .child(profileinput.files[0].name)
                  .put(profileinput.files[0])
                  .then((res) => {
                    res.ref.getDownloadURL()
                    .then((imageb) => {
                      let img = imageb;
                      let ref = firebase.database().ref("users").child(this.user.id);
                      ref.update({
                        image: img,
                      })
                    })
                    .then(()=>{
                      let homephoto = document.querySelector('.homephoto')
                      homephoto.src= this.userData.image
                      this.$cookies.set("imageAnime", this.userData.image);
                      this.$store.commit('SET_LOADING',false)
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$store.commit('SET_LOADING',false)
                        this.$store.commit("SET_MESSAGE",`Erro ao atualizar a imagem de perfil. Tente novamente mais tarde.`);
                        this.$store.commit("SET_IMAGE_MESSAGE", "error");
                    });
              })
              .catch((err) => {
                  console.log(err);
                  this.$store.commit('SET_LOADING',false)
                  this.$store.commit("SET_MESSAGE",`Erro ao inserir a imagem de perfil no sistema. Tente novamente mais tarde.`);
                  this.$store.commit("SET_IMAGE_MESSAGE", "error");
              });
          }

          await this.save(slug)
      },


      
       
    },
    mounted() {
        this.getAnimes()
        this.getSeasons()
        this.getData()
        this.resetInputImage()
        window.addEventListener('keydown',(ev)=>{
          if(ev.key == 'Escape'){
            this.closeEdit()
          }
        })
        if(this.$route.query.session){
            this.activetab=this.$route.query.session
        }
    },
  };
  </script>
  

  