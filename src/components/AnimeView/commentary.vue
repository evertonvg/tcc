<template>
    <div class="flex align-start justify-start mb-16">
        <div class="rounded-full h-24 w-24 overflow-hidden">
            <router-link :to="`/profile/${getSluged}ososlklk${idsocial}`">
                <img :src="getImagec" class="w-full h-full object-cover" @error="replaceByDefault" />
            </router-link>
        </div>
        <div class="ml-4 flex-1 flex flex-col align-start justify-start group">
            <div class="text-left flex items-center justify-start">
                <span class="font-bold text-sm text-header">
                    {{ getNamec }} 
                </span>
                <span class="text-white text-xs bg-red h-4 px-1  ml-4 flex items-center justify-center">
                    {{data}}
                </span>
                <button @click="event" :data-id="id" :data-text="comment" class="cursor-pointer ml-3 block lg:hidden group-hover:block">
                    <alert size="20" title="reportar comentário" :data-id="id" :data-text="comment"  fillColor="#AC3D54"  />
                </button>
                
                <!-- <button   @click="eventDelete" :data-id="id" :data-text="comment" class="cursor-pointer ml-3 block lg:hidden group-hover:block">
                    {{$cookies.get('loginIdAnime')}} <br>
                    {{ iduser }}
                    
                    <delete size="24" title="reportar comentário" :data-user="iduser" :data-id="id" :data-text="comment"  fillColor="#1CD9B8"  />
                </button> -->
            </div>
            <div class="text-left rounded border border-black p-4 mt-2 relative">
                <p>
                    {{comment}} 
                </p>
                <div :class="['absolute  left-0 flex items-start justify-start gap-4', this.$cookies.get('idUser') ? '-bottom-10' : '-bottom-5']">
                    <button v-if="this.$cookies.get('idUser')" :data-idcomment="idcomment" :data-iduser="iduser" @click="setlike " :class="['flex items-center border rounded-sm justify-center gap-1 p-1  transition-all',checkifLike ? 'bg-red hover:bg-red2 text-white border-red hover:border-red2' : 'bg-white hover:bg-gray text-black']">
                        <thumb-up></thumb-up> {{ checkifLike ? 'Curtiu' : 'Curtir' }} 
                    </button>
                    
                    <span class="text-xs font-bold">
                        {{ stringlikes }} 
                    </span>                   
  
                </div>
            </div>
        </div>
        
    </div> 

</template>
<script>
import imgDefault from '@/assets/img/default.jpg';
export default {
    props:['comment','photo','data','name','id','report','idReport','reportComent','iduser','users','idsocial','likes','setlike',"idcomment",'checkiflike'],
    name:'comentarysView',
    emits: ['update:report','update:idReport','update:reportComent'],
    data() {
        return {
            img:'',
            nam:''
        }
    },
    computed:{
        stringlikes(){
            if(this.checkTotalComments == 0){
                return 'Ninguém curtiu isso';
            }
            if(this.checkTotalComments == 1 && this.checkifLike){
                return 'Você curtiu isso';
            }
            if(this.checkifLike && this.checkTotalComments == 2){
                return `Você e mais uma pessoa curtiram isso`
            }
            if(this.checkifLike && this.checkTotalComments){
                return `Você e mais ${this.checkTotalComments - 1} pessoas curtiram isso`
            }
            if(this.checkTotalComments == 1){
                return 'Uma pessoa curtiu isso';
            }

            return `${this.checkTotalComments} pessoas curtiram isso`
        },
        checkifLike(){
            if(this.$cookies.get("idUser")){
                let checkLike = [] 
                
                checkLike = this.likes.filter((item)=>{
                    return item.commentId == this.idcomment
                })

                checkLike = checkLike.filter((item)=>{
                    return item.userId == this.$cookies.get("idUser")
                })

                return checkLike.length ?  true : false
            }else{
                return false
            }
            

        
        },
        checkIfBan(){

            let ban = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            return ban[0].active == true ? true : false

        },
        checkTotalComments(){
            let checkLike = []
            checkLike = this.likes.filter((item)=>{
                return item.commentId == this.idcomment
            })
            return checkLike.length
        },
        getImagec(){
       
            let img = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            return img[0].image.toString()
        },
        getNamec(){
    
            let name = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            return name[0].name.toString()
        },
        getSluged(){
            let slug = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            return slug[0].slug.toString()
        }
       
       
    },
    methods:{
        getImage(){
            this.img = ''
            let img = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            this.img = img[0].image
        },
        getName(){
            this.nam = ''
            let name = this.users.filter((item)=>{
                return item.idUser == this.idsocial
            })
            this.nam =  name[0].name
        },
        replaceByDefault(e){
            e.target.src = imgDefault
        },
        event(ev){
            this.$emit('update:report', !this.report); 
            this.$emit('update:idReport', ev.currentTarget.dataset.id)
            this.$emit('update:reportComent', ev.currentTarget.dataset.text)
        },
        eventDelete(ev){
            console.log(ev.currentTarget.dataset.user)
        }
    },
    mounted(){
        this.img = ''
        this.nam = ''
        this.getImage()
        this.getName()
    }
    
}
</script>