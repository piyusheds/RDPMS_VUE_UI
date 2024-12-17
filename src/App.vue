<template>
	<div>
		<div class="app-container" v-if="showLayout">
			<div class="main">
				<Sidebar v-if="showLayout" class="sidebar" />
				<Navbar v-if="showLayout" class="navbar" />
				<router-view />
			</div>
		</div>

		<Sign v-if="!showLayout" @signedIn="onSignedIn" />
		<!-- <register v-if="showLayout" @Register="RegisterUp" /> -->
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import Sign from './components/Sign.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Register from './views/Register.vue'

const showLayout = ref(false)

const router = useRouter()

const onSignedIn = () => {
	showLayout.value = true
	router.push('/home')
}

const RegisterUp = () => {
	showLayout.value = true
	router.push('/Register')
}


</script>


<style lang="scss">
:root {
	--primary: #009cff;
	--light: #f3f6f9;
	--dark: #191c24;
	--sidebar-width: 300px; 
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}

.app {
	display: flex;
}

main {
	flex: 1 1 0;
	padding: 2rem;
	padding-left: 16%;
	padding-right: 0px; 

	@media (max-width: 1024px) {
		padding-left: 6rem;
	}
}
</style>
