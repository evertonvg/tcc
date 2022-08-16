<template>
	<div>
		<h1>Home</h1>
		<button @click="logout">Logout</button>
		<p>
			{{$cookies.get('nameAnime')}}
		</p>
		<img :src="$cookies.get('imageAnime')" referrerpolicy="no-referrer">
	</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
export default {
	name: 'HomeView',
	methods:{
		logout(){
			firebase.auth().signOut().then(()=>{
				this.$cookies.remove("loginIdAnime")
				this.$router.push('/login')
			})
			.catch((err)=>{
				console.log(err)
			})
		}
	},
	mounted(){
		if(this.$cookies.get("loginIdAnime")==null){
			this.$router.push('/login')
		}
	},
}
</script>
