<template>
    <header class="h-[30vh] sm:h-[50vh]  bg-cover bg-no-repeat bg-center overflow-hidden bg-gradient-to-b from-white to-header" ref="banner"></header>
    <section class="px-5 container mx-auto mt-4 -translate-y-20">
        <infosView :anime="anime" :finalnote="notes"/>
        <div class="container h-full mx-auto flex items-start justify-start mt-4" v-show="seasons.length">
            <div class="mb-4 flex items-center justify-center gap-4 w-full flex-col sm:flex-row">
                <div class="flex items-start justify-start w-full sm:w-[215px]">
                    
                    <select v-model="temporada" class="h-10 rounded px-4 outline-none cursor-pointer min-w-full text-graytext" @change="()=>{setVideos,type=temporada}" ref="selectemp">
                        <optgroup label="Temporadas" class="font-bold" v-show="seasons.some((item)=>{return item.type=='Temporada'})">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='Temporada'" >{{season.name}}</option>
                        </optgroup>
                        <optgroup label="Filmes" class="font-bold" v-show="seasons.some((item)=>{return item.type=='Filme'})">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='Filme'" >{{season.name}}</option>
                        </optgroup>
                        <optgroup label="OVAS" class="font-bold" v-show="seasons.some((item)=>{return item.type=='OVA'})">
                            <option v-for="(season,index) in seasons" :key="index" :value="season.order" v-show="season.type=='OVA'" >{{season.name}}</option>
                        </optgroup>
                    </select>
                </div>
                <notesView  :notes="notes"  />
                <div class="flex-1 rounded h-full w-full flex items-center justify-center sm:items-end sm:justify-end" >
                    <play fillColor="#E7711B" :size="40" title="aba de videos" class="cursor-pointer bg-white" v-show="videos!=undefined" @click="modalMusic=true"/>
                </div>
                
            </div>    
        </div>

        <!-- dados de temporada  -->
        <transition-group tag="div" name="fade">
            <div class="rounded flex flex-col sm:flex-row justify-center gap-4" v-for="(season,index) in seasons" :key="index" v-show="temporada == season.order">
                <!-- informações da temporada  -->
                <seasoninfoView :season="season" :timeFormat="formatted(season.launch)"  />

                <!-- avaliações e comentarios  -->
                <div class="flex-1 bg-white p-4">
                    <div class="mb-12">
                        <h2 class="text-left mb-8 text-xl font-bold" v-show="season.description">Descrição da temporada/filme/OVA</h2>
                        <p class="text-left">
                            {{season.description  }}
                        </p>
                    </div>
                    <div v-show="$cookies.get('loginIdAnime') == null" class="font-bold">
                        Para Fazer avaliações e comentários você deve fazer <router-link to="/login" :class="[`bg-red rounded-sm p-2 text-white`]">Login</router-link>
                    </div>
                    <div v-show="$cookies.get('loginIdAnime') != null" v-if="season.status!='Lançamento'">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Faça suas avaliações
                        </h2>
                        <evaluatestarView v-model:grade="grade.animation"  name="Animação:" />
                        <evaluatestarView v-model:grade="grade.history"  name="História:" />
                        <evaluatestarView v-model:grade="grade.characters"  name="Personagens:" />
                        <evaluatestarView v-model:grade="grade.sound" name="Trilha sonora:" />

                        <div class="text-left">
                            <button class="btn disabled:bg-gray" :disabled="grade.animation==0 || grade.history==0 || grade.characters==0 || grade.sound==0" @click="saveEvaluation" :data-id="idActiveEvaluation">
                                {{sendOrUpdateEvaluation}}
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <p class="text-black text-center">Avaliações indisponiveis para temporadas em lançamento</p>
                    </div>
                    <div class="mt-12" v-show="$cookies.get('loginIdAnime') != null">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Deixe seu comentário
                        </h2>
                        <textarea v-model="commentary" class="border border-black rounded w-full h-40 p-4" placeholder="escreva seu comentário..."></textarea>
                        <div class="text-left">
                            <button class="btn disabled:bg-gray" @click="saveComment" :disabled="commentary.length <= 10">
                                Postar Comentário
                            </button>
                        </div>
                    </div>
                    <div class="mt-12">
                        <h2 class="text-left mb-8 text-xl font-bold">
                            Confira outros comentários
                        </h2>
                        <!-- {{ comments }} -->
                        <transition-group name="fade">
                            <commentaryView v-for="(comment,index) in comments.slice().reverse()" :key="index" :id="comment.id" v-model:idReport="idReport" v-model:report="report" v-show="index < commentaryLimit && comment.active==true" :comment="comment.comment" :photo="comment.photo" :data="commentedformatted(comment.date)" :name="comment.user" />
                        </transition-group>

                        <button class="btn disabled:bg-gray" @click="showMoreComments" v-show="commentaryLimit < comments.length">
                            Ver mais comentários
                        </button>

                        <p v-show="!comments.length" class="text-black text-center">Sem comentários disponiveis</p>
                    </div>
                </div>
            </div>
        </transition-group>
        <div>
            <carousel :items="recomended" title="Animes semelhantes" link="" v-show="recomended.length" />
        </div>
       

    </section>
    <transition name="fade">
        <musicModal @click="modalMusic=false"  v-if="modalMusic" :videos="videos"  />
    </transition>



    <transition name="fade">
            <!-- Main modal -->
            <div v-show="report" id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-lightblue flex items-center justify-center" >
                <div class="relative w-full h-full max-w-2xl md:h-auto">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Reportar Comentário {{ idReport }}
                            </h3>
                            <button @click="report=!report" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span class="sr-only" >Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-6 space-y-6">
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Conte-nos o que o comentário possui de errado:
                            </p>
                            <textarea
                                id="report"
                                name="report"
                                v-model="textreport"
                                :class="[
                                `w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`,
                                ]"
                            ></textarea>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button class="btn disabled:bg-gray" @click="sendreport">
                                Enviar report
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </transition>
</template>

<script>
import musicModal from '@/components/AnimeView/music.vue';
import infosView from '@/components/AnimeView/infos.vue';
import notesView from '@/components/AnimeView/notes.vue';
import seasoninfoView from '@/components/AnimeView/seasoninfos.vue';
import commentaryView from '@/components/AnimeView/commentary.vue';
import evaluatestarView from '@/components/AnimeView/evaluatestar.vue';
import carousel from '@/components/carouselVue.vue'
import firebase from "firebase";
import {  useDateFormat } from '@vueuse/core';
export default {
    setup(){
        const formatted = (data) =>{
            return useDateFormat(data, 'YYYY');
        }
        const commentedformatted = (data) =>{
            return useDateFormat(data, 'DD/MM/YYYY');
        }
        return {formatted,commentedformatted}
    },
    components:{
        musicModal,
        infosView,
        notesView,
        seasoninfoView,
        commentaryView,
        evaluatestarView,
        carousel,
        
    },

    data() {
        return {
            type:"",
            words:['puta','viado','merda','caralho','buceta','pau','chupa','cacete','esperma','gozo','gozar','gozada','sexo','trepar','transar','fuder','foda','foda-se'],
            textreport:'',
            report:false,
            idAllComments:[],
            recomended:[],
            idEvaluation:'',
            commentaryLimit:4,
            modalMusic:false,
            video:'',
            anime: null,
            temporada:1,
            idAnime:'',
            seasons:[],
            idSeasons:[],
            videos:[],
            evaluations:[],
            evaluationsUser:[],
            idEvaluations:[],
            idEvaluationsUser:[],
            idActiveEvaluation:"",
            seasonVotes:0,
            allComments:[],
            comments:[],
            commentary:'',
            sendOrUpdateEvaluation:'',
            data:'',
            checkCommentTemp:true,
            selectText:'',
            idReport:'',
            grade:{
                animation:0,
                sound:0,
                characters:0,
                history:0
            },
            notes:{
                animation:'0.00',
                sound:'0.00',
                characters:'0.00',
                history:'0.00',
                finalNote: '0.00'
            }
        }
    },
    
    watch:{
        modalMusic(newer){
            if(newer){
                document.body.style.overflow = 'hidden';
            }else{
                document.body.style.overflow = 'auto'
            }
            
        },
        temporada(){
            this.getTempComments()
            this.$router.replace({ path: this.$route.fullPath, query: { temp: this.temporada }})
            this.setEvaluation()
            this.setnotes()
            this.commentaryLimit = 4
            this.setVideos()
        },
        report(){
            if(this.report){
                document.body.style.overflow = 'hidden'
            }else{
                document.body.style.overflow = 'auto'
            }
        }
    },
    
    methods:{
        sendreport(){
            let date = new Date().toString()
            this.$store.commit('SET_LOADING',true)
            let ref = firebase.database().ref('reports');
            ref.push({
                idComment: this.idReport,
                textreport:this.textreport,
                date:date,
            })
                .then(() => {
                this.report = false
                this.textreport = ''
                this.$store.commit('SET_LOADING',false)
                this.$store.commit(
                    "SET_MESSAGE",
                    `Seu report foi enviado e em breve ele será avaliado.`   
                );
                this.$store.commit("SET_IMAGE_MESSAGE", "welcome");
                this.commentary = ''
            })
                .catch((err) => {
                console.log(err);
                this.$store.commit(
                    "SET_MESSAGE",
                    `Erro ao fazer o report, tente mais tarde..`   
                );
                this.$store.commit("SET_IMAGE_MESSAGE", "error");
            });
        },
        setTemp(){
            this.selectText = this.$refs.selectemp.options[this.$refs.selectemp.options.selectedIndex].text
        },
        getRecomended(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('active').equalTo(true).on("value", (snapshot) => {
                this.recomended = []
                snapshot.forEach((ss) => {
                    this.recomended.push(ss.val());
                });
                this.recomended = [...this.recomended].filter((item)=>{
                    return this.anime.categories.some((cat)=>{
                        return item.categories.includes(cat)
                    })
                });
                this.recomended = [...this.recomended].filter((item)=>{
                    return !this.$route.fullPath.includes(item.slug)
                })
                this.shuffleArray()
                });
            
            

        },
        shuffleArray() {
        // Loop em todos os elementos
            for (let i = this.recomended.length - 1; i > 0; i--) {
                    // Escolhendo elemento aleatório
                const j = Math.floor(Math.random() * (i + 1));
                // Reposicionando elemento
                [this.recomended[i], this.recomended[j]] = [this.recomended[j], this.recomended[i]];
            }

        },
        setnotes(){
            
            let sound=0,characters=0,animation=0,history=0;
            let notesSeason = []
            notesSeason= this.evaluations.filter((item)=>{ 
                return item.season == this.temporada
            })
            this.seasonVotes = notesSeason.length
            

            notesSeason.forEach((item)=>{
                sound = sound + item.sound
                characters = characters + item.characters
                animation = animation + item.animation
                history = history + item.history
            })
            sound = sound == 0 ? parseFloat(0).toFixed(2) : parseFloat(sound / notesSeason.length).toFixed(2)
            characters = characters == 0 ? parseFloat(0).toFixed(2) : parseFloat(characters / notesSeason.length).toFixed(2)
            animation = animation == 0 ? parseFloat(0).toFixed(2) : parseFloat(animation / notesSeason.length).toFixed(2)
            history = history == 0 ? parseFloat(0).toFixed(2) : parseFloat(history / notesSeason.length).toFixed(2)
            this.notes.sound = sound
            this.notes.characters = characters
            this.notes.animation = animation
            this.notes.history = history

            this.notes.finalNote = parseFloat(parseFloat(this.notes.sound) + parseFloat(this.notes.characters) + parseFloat(this.notes.animation) + parseFloat(this.notes.history)).toFixed(2) / 4
        },
        showMoreComments(){
            this.commentaryLimit = this.commentaryLimit + 8
        },
        getTempComments(){
            let comments = []
            this.allComments.forEach((cmmt)=>{
                if(parseInt(this.temporada) == parseInt(cmmt.season)){
                    comments.push(cmmt)
                }
            })

            this.comments  = comments
        },

        getAnime(){
            let ref = firebase.database().ref('animes');
            ref.orderByChild('slug').equalTo(this.$route.params.slug).limitToFirst(1).on("value", (snapshot) => {
                this.anime =  []
                this.idAnime = ''
                snapshot.forEach((ss) => {
                    this.anime = ss.val();
                    this.idAnime = ss.key
                });
                if(this.anime.imageBanner){
                    this.$refs.banner.style.backgroundImage = `url(${this.anime.imageBanner})`
                }
                this.getSeasons(this.idAnime)
                this.getComments(this.idAnime)
                this.getEvaluations(this.idAnime)
                this.getRecomended()
                this.$store.commit('SET_LOADING',false)
            });
        },
 
        getComments(id){
            let ref = firebase.database().ref('comments');
            ref.orderByChild('idAnime').equalTo(id).on("value", (snapshot) => {
                this.allComments =  []
                this.idAllComments =  []

                snapshot.forEach((ss) => {
                    this.allComments.push(ss.val());
                    this.idAllComments.push(ss.key);
                    
                });
                this.allComments.forEach((el,ind)=>{
                    el.id = this.idAllComments[ind]
                })
                console.log(this.allComments)
                
                this.getTempComments()
           
            });
        },
        saveComment(){
            this.$store.commit('SET_LOADING',true)
            let words = this.commentary.split(' ')
            if(words.some((item)=>{
                return this.words.includes(item)
            })){
                this.$store.commit('SET_LOADING',false)
                this.$store.commit(
                    "SET_MESSAGE",
                    `Mensagem imprópria no comentário, por favor tente novamente.`   
                );
                this.$store.commit("SET_IMAGE_MESSAGE", "welcome");
                return;
            }
            let date = new Date().toString()
            let ref = firebase.database().ref('comments');
                  ref.push({
                        idAnime: this.idAnime,
                        animeName:this.anime.name,
                        season:this.temporada,
                        photo:this.$cookies.get('imageAnime'),
                        user:this.$cookies.get("nameAnime"),
                        idUser:this.$cookies.get("loginIdAnime"),
                        date:date,
                        comment:this.commentary,
                        active:true

                  })
                      .then(() => {
                        this.$store.commit('SET_LOADING',false)
                        this.$store.commit(
                            "SET_MESSAGE",
                            `Seu comentário foi salvo com sucesso ^^`   
                        );
                        this.$store.commit("SET_IMAGE_MESSAGE", "welcome");
                        this.commentary = ''
                  })
                      .catch((err) => {
                      console.log(err);
                  });
        },
        
        setVideos(){
            let seas = this.seasons.filter((season)=>{
                return season.order == this.temporada;
            })
            
            this.videos = seas[0].videos
        },
        getSeasons(id){
            let ref = firebase.database().ref('seasons');
            ref.orderByChild('idAnime').equalTo(id).on("value", (snapshot) => {
                this.seasons =  [];
                this.idSeasons = [];
                snapshot.forEach((ss) => {
                    this.idSeasons.push(ss.key)
                    this.seasons.push(ss.val())
                });
                this.videos  = this.seasons[0].videos;
                if(this.$route.query.temp){
                    this.temporada=this.$route.query.temp
                }
            
            });
        },
        getEvaluations(id){
            let ref = firebase.database().ref('evaluations');
            ref.orderByChild('idAnime').equalTo(id).on("value", (snapshot) => {
                this.evaluations = []
                this.idEvaluations = []
                snapshot.forEach((ss) => {
                    this.evaluations.push(ss.val());
                    this.idEvaluations.push(ss.key);
                });
                this.evaluationsUser = []
                this.idEvaluationsUser = []

                this.evaluations.forEach((ev,index)=>{
                    if(ev.idUser == this.$cookies.get("idUser")){
                        this.evaluationsUser.push(ev)
                        this.idEvaluationsUser.push(this.idEvaluations[index])
                    }
                })


                this.setEvaluation()
                this.setnotes()
            });
            
        },
        setEvaluation(){
            let verify = false
            this.evaluationsUser.forEach((el,ind)=>{
                if(el.season == this.temporada){
                    this.idActiveEvaluation = this.idEvaluationsUser[ind]
                    this.grade.sound = el.sound
                    this.grade.characters = el.characters
                    this.grade.history = el.history
                    this.grade.animation = el.animation
                    this.sendOrUpdateEvaluation = 'Atualizar Avaliação'
                    verify = true
                }
                
            })
            if(verify==false){
                this.idActiveEvaluation = ''
                this.grade.sound = 0
                this.grade.characters = 0
                this.grade.history = 0
                this.grade.animation = 0
                this.sendOrUpdateEvaluation = 'Enviar Avaliação'
            }
            
            
        },
        saveEvaluation(){
            let date = new Date().toString()
            this.$store.commit('SET_LOADING',true)
            // console.log(this.idActiveEvaluation)
            if(this.idActiveEvaluation==''){
                let ref = firebase.database().ref('evaluations');
                ref.push({
                    idAnime: this.idAnime,
                    animeName:this.anime.name,
                    season:this.temporada,
                    user:this.$cookies.get("nameAnime"),
                    idUser:this.$cookies.get("idUser"),
                    date:date,
                    sound:this.grade.sound,
                    characters:this.grade.characters,
                    animation:this.grade.animation,
                    history:this.grade.history,
                    active:true

                }).then(() => {
                    this.$store.commit('SET_LOADING',false)
                    this.$store.commit(
                        "SET_MESSAGE",
                        `Sua avaliação foi enviada com sucesso ^.^`   
                    );
                    this.$store.commit("SET_IMAGE_MESSAGE", "logout");
  
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                let ref = firebase.database().ref("evaluations").child(this.idActiveEvaluation);
                ref.update({
                    
                    date:date,
                    sound:this.grade.sound,
                    characters:this.grade.characters,
                    animation:this.grade.animation,
                    history:this.grade.history,
   
                }).then(() => {
                    this.$store.commit('SET_LOADING',false)
                    this.$store.commit(
                        "SET_MESSAGE",
                        `Sua avaliação foi atualizada com sucesso ^.^`   
                    );
                    this.$store.commit("SET_IMAGE_MESSAGE", "logout");
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
    },
    
    mounted() {
        let slug = this.$route.params.slug.replaceAll('-',' ').charAt(0).toUpperCase() + this.$route.params.slug.replaceAll('-',' ').slice(1); 
        document.title = `${slug} - Otaku Stars `;
        this.getAnime()
        window.addEventListener('keydown',(ev)=>{
            switch(ev.key){
                case 'Escape': this.modalMusic = false
            }
        })    
    },
}
</script>

<style>
    .svg-star {
        fill:none;
    }
    .svg-star:hover{
        fill:#E7711B;
    }
</style>