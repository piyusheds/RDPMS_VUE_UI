<template>
	<div>
		<div class="app-container" v-if="showLayout">
			<div class="main">
				<Sidebar v-if="showLayout" class="sidebar" />
				<Navbar v-if="showLayout" class="navbar" />
				<router-view />
			</div>
		</div>

		<!-- <Sign v-if="!showLayout" @signedIn="onSignedIn" /> -->
		 <login v-if="!showLayout" @signedIn="onSignedIn" />
		 <!-- <login></login> -->
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import Login from './views/SignIn/Login.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoginService from './Services/LoginService';

const showLayout = ref(false);
const router = useRouter();

// Check token and route on mount
onMounted(() => {
  const token = LoginService.getToken(); // Check for authentication token 
  if (token) {
    showLayout.value = true;

    const storedRoute = localStorage.getItem('currentRoute');

    // Only navigate if there's a stored route and it's not the current one
    if (storedRoute && router.currentRoute.value.fullPath !== storedRoute) {
      router.replace(storedRoute); // Use `replace` to avoid adding to the history stack
    }
  } else {
    showLayout.value = false; // Show Sign-In page if not authenticated
    router.replace('/login'); // Redirect to Sign-In
  }
});



// Handle user sign-in
const onSignedIn = () => {
	console.log("User signed in. Showing layout.");
	showLayout.value = true;
	router.push('/home');  // Once signed in, navigate to /home
};

router.beforeEach((to, from, next) => {
  const token = LoginService.getToken(); // Get token from auth service
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to the sign-in page if not authenticated
    next({ name: 'login' });
  } else {
    // Store the route in `localStorage` only if authenticated and route changes
    if (isAuthenticated && to.fullPath !== localStorage.getItem('currentRoute')) {
      localStorage.setItem('currentRoute', to.fullPath);
    }
    next(); // Proceed to the route
  }
});


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

// body {
// 	background: var(--light);
// }

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
	padding-left: 19.5%;
	padding-right: 20px;

	@media (max-width: 1024px) {
		padding-left: 6rem;
	}
}
</style>