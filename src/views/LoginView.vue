<template>
  <section class="text-gray-600 body-font bg-cover bg-center bg-no-repeat h-screen transition-all" ref="logsection">
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
      
      <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <div class="w-full md:pr-16 lg:pr-0 pr-0">
			<h1 class="title-font font-medium text-3xl text-gray-900">Bem vindo ao OTAKU STARS!!</h1>
			<p class="leading-relaxed mt-4 mb-10">A maior rede de avaliações de animes do Brasil.</p>
		</div>
		<h2 class="text-gray-900 text-lg font-medium title-font mb-5">Entre com uma de suas redes sociais</h2>
		<div class="flex items-center justify-center gap-4 mb-10">
			<div class="w-20 h-20 border cursor-pointer" @click="login('google')">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png" alt="Login com o gooole" class="w-full h-full object-cover"/>
			</div>
			<div class="w-20 h-20 border cursor-pointer" @click="login('facebook')">
				<img src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-3-1.png" alt="Login com o facebook" class="w-full h-full object-cover"/>
			</div>
			<div class="w-20 h-20 border cursor-pointer" @click="login('twitter')">
				<img src="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-3.png" alt="Login com o Twitter" class="w-full h-full object-cover"/>
			</div>
		</div>
        <!-- <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click="signup">Logar</button> -->
        <p class="text-xs text-gray-500 mt-3">*Seus dados pessoais não serão salvos.</p>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

import firebase from 'firebase'
export default {
  name: 'LoginView',
  data() {
	return {
		bgs: [
			'https://c.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
			'https://thumbs.gfycat.com/AdmirableMildDesertpupfish-size_restricted.gif',
			'https://static.zerochan.net/Pixiv.Id.33638616.full.3409840.gif',
			'https://i.pinimg.com/originals/80/7c/a1/807ca16b42e5fe7dc8a5794157076559.png',
			'https://images2.alphacoders.com/750/750482.png',
			'https://i.pinimg.com/originals/7a/7d/cf/7a7dcfa6474ec4cbfa81113eebe3c0dc.jpg',
			'https://i.pinimg.com/originals/08/7c/20/087c200dde7ec30c0e6eb3001c77464c.gif',
			'https://c.tenor.com/IZw6O8nUD-oAAAAC/cherry-blossom-anime.gif',
			'https://i.pinimg.com/originals/37/46/33/3746334c4596fe540639150232ff0698.gif',
			'https://c.tenor.com/Ej_Mh9O9w-8AAAAC/anime-slow.gif'
		]
	}
  },
  methods:{
	background(){
		let index = Math.floor(Math.random() * this.bgs.length-1);
		this.$refs.logsection.style.backgroundImage = `url(${this.bgs[index]})`
		setInterval(()=>{
			let index = Math.floor(Math.random() * this.bgs.length-1);
			this.$refs.logsection.style.backgroundImage = `url(${this.bgs[index]})`
		},10000)
	},
    signup(){
      firebase.auth().createUserWithEmailAndPassword(this.email,this.senha)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    login(link){
		let provider;
		switch(link){
			case 'google':
				provider = new firebase.auth.GoogleAuthProvider();
			break;
			case 'facebook':
				provider = new firebase.auth.FacebookAuthProvider();
				provider.addScope('user_photos');
			break;
			case 'twitter':
				provider = new firebase.auth.TwitterAuthProvider();
			break;
		}

		

		firebase.auth().signInWithPopup(provider)
		.then((res)=>{
			console.log(res)

			this.$cookies.set("loginIdAnime",res.credential.accessToken)
			switch(link){
				case 'google':
					this.$cookies.set("imageAnime",res.additionalUserInfo.profile.picture)
				break;
				case 'facebook':
					this.$cookies.set("imageAnime",res.additionalUserInfo.profile.picture.data.url)
				break;
				case 'twitter':
					this.$cookies.set("imageAnime",res.additionalUserInfo.profile.profile_image_url_https)
				break;
			}
			
			this.$cookies.set("nameAnime",res.additionalUserInfo.profile.name)
			this.$router.push('/')
		})
		.catch((err)=>{
			console.log(err.message)
		})
    }
  },
	mounted(){
		this.background()
		if(this.$cookies.get("loginIdAnime")!=null){
			this.$router.push('/')
		}
	}

}
</script>
