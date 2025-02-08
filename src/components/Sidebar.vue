<template>
	<aside>
		<div class="sidebar pe-4 pb-3">
			<nav class="navbar bg-light navbar-light">
				<a href="index.html" class="navbar-brand mx-4 mb-3">
					<h3 class="text-primary">HOWRAH</h3>
				</a>
				<div class="d-flex align-items-center ms-4 mb-4">
					<div class="position-relative">
						<img class="rounded-circle" :src="trainIcon" alt="" style="width: 40px; height: 40px;">

						<div
							class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
						</div>
					</div>
					<div class="ms-3">
						<h6 class="mb-0" style="font-weight: 700;">EEC</h6>
						<span>Admin</span>
					</div>
				</div>
				<div class="navbar-nav w-100">
					<!-- Dashboard Icon -->
					<RouterLink to="/Home" class="nav-item nav-link" active-class="active">
						<i class="fa fa-tachometer-alt me-2"></i>Dashboard
					</RouterLink>

					<div class="nav-item">
						<a href="#" class="nav-link" id="liveDataDropdown" role="button" data-bs-toggle="dropdown"
							aria-expanded="false" @click="toggleDropdown">
							<i class="fa fa-bell me-2"></i>Alert Data
							<i :class="dropdownOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'" class="ms-2" style="margin-left: 22px !important;"></i>
						</a>
						<div class="dropdown-menu no-bg-menu" aria-labelledby="liveDataDropdown">
							<RouterLink to="/LiveData" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-bolt me-2"></i>Real-Time Data
							</RouterLink>
							<RouterLink to="/HistoryData" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-clock me-2"></i>History Data
							</RouterLink>
						</div>
					</div>

					<div class="nav-item dropdown">
						<a href="#" class="nav-link" id="liveDataDropdown" role="button" data-bs-toggle="dropdown"
							aria-expanded="false" @click="healthtoggleDropdown">
							<i class="fa fa-heartbeat me-2"></i>Health Data
							<i :class="healthdropdownOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'" class="ms-2"></i>
						</a>
						<div class="dropdown-menu no-bg-menu" aria-labelledby="liveDataDropdown">
							<RouterLink to="/LivePacket" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-wave-square me-2"></i>Real-Time Data
							</RouterLink>
							<RouterLink to="/HistoryPacket" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-history me-2"></i>History Data
							</RouterLink>
						</div>
					</div>

<<<<<<< HEAD



					<div class="nav-item">
						<a href="#" class="nav-link" id="liveDataDropdown" role="button" data-bs-toggle="dropdown"
							aria-expanded="false" @click="graphtoggleDropdown">
							<i class="fas fa-chart-line" aria-label="Graphs & Values"></i> Graphs
							<i :class="graphdropdownOpen ? 'fa fa-chevron-up' : 'fa fa-chevron-down'" class="ms-2" style="margin-left: 45px !important;"></i>
						</a>
						<div class="dropdown-menu no-bg-menu" aria-labelledby="liveDataDropdown">
							<RouterLink to="/AcVoltageGraph" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-wave-square" aria-label="AC Voltage Graph"></i> Ac Voltage
							</RouterLink>

							<RouterLink to="/AcCurrentGraph" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fa fa-water" aria-label="AC Current Graph"></i> Ac Current
							</RouterLink>
							<RouterLink to="/DcVoltageGraph" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fas fa-bolt" aria-label="DC Voltage Graph"></i> Dc Voltage
							</RouterLink>
							<RouterLink to="/DcCurrentGraph" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fas fa-long-arrow-alt-right" aria-label="DC Current Graph"></i> Dc Current
							</RouterLink>
							<RouterLink to="/DigitalInput" class="nav-item nav-link no-bg-item" active-class="active"
								@click.stop>
								<i class="fas fa-toggle-on" aria-label="Digital Input"></i> Digital Input
							</RouterLink>
						</div>
					</div>


					<!-- <RouterLink to="/GraphChart" class="nav-item nav-link" active-class="active">
						<i class="fa fa-chart-line me-2"></i>Graphs
					</RouterLink> -->
=======
					<!-- Signal Icon -->
					<RouterLink to="/GraphChart" class="nav-item nav-link" active-class="active">
						<i class="fa fa-chart-line me-2"></i>Graphs
					</RouterLink>


>>>>>>> e0ad36401195423255db1e02af8817fe8efaedae
					<!-- Add Device Icon -->
					<RouterLink to="/AddDeviceTable" class="nav-item nav-link" active-class="active">
						<i class="fa fa-cogs me-2"></i>Device Management
					</RouterLink>
					
					<!-- User Table Icon -->
					<RouterLink to="/UserTable" class="nav-item nav-link" active-class="active">
						<i class="fa fa-user-friends me-2"></i>User Management
					</RouterLink>



					<!-- Forget Icon -->
					<RouterLink to="/forget" class="nav-item nav-link" active-class="active">
						<i class="fa fa-question-circle me-2"></i>Forget
					</RouterLink>

					<!-- Logout -->
					<a @click="logout" class="nav-item nav-link" style="cursor: pointer;">
						<i class="fa fa-sign-out-alt me-2"></i>Logout
					</a>
				</div>
			</nav>
		</div>
	</aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import trainIcon from '/assets/train_icon.png';


const is_expanded = ref(localStorage.getItem('is_expanded') === 'true');

const toggleMenu = () => {
	is_expanded.value = !is_expanded.value;
	localStorage.setItem('is_expanded', is_expanded.value);
};
const dropdownOpen = ref(true);
const healthdropdownOpen = ref(true);
const graphdropdownOpen = ref(true);

// Method to toggle the dropdown state
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const healthtoggleDropdown = () => {
	healthdropdownOpen.value = !healthdropdownOpen.value;
};
const graphtoggleDropdown = () => {
	graphdropdownOpen.value = !graphdropdownOpen.value;
};

onMounted(() => {
	if (is_expanded.value) {
		document.querySelector('.sidebar').classList.add('open');
	} else {
		document.querySelector('.sidebar').classList.remove('open');
	}
});

const router = useRouter();
const logout = () => {
	localStorage.removeItem('authToken');
	router.push('/sign');
	window.location.reload();
};
</script>

<style scoped strict>
:root {
	--primary: #009cff;
	--light: #f3f6f9;
	--dark: #191c24;
}

.nav-item.nav-link.active {
	color: #007bff;
	font-weight: bold;
	text-decoration: none;
}

.back-to-top {
	position: fixed;
	display: none;
	right: 45px;
	bottom: 45px;
	z-index: 99;
}

/*** Spinner ***/
#spinner {
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
	z-index: 99999;
}

#spinner.show {
	transition: opacity 0.5s ease-out, visibility 0s linear 0s;
	visibility: visible;
	opacity: 1;
}

/*** Button ***/
.btn {
	transition: 0.5s;
}

.btn.btn-primary {
	color: #ffffff;
}

.btn-square {
	width: 38px;
	height: 38px;
}

.btn-sm-square {
	width: 32px;
	height: 32px;
}

.btn-lg-square {
	width: 48px;
	height: 48px;
}

.btn-square,
.btn-sm-square,
.btn-lg-square {
	padding: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	font-weight: normal;
	border-radius: 50px;
}

/*** Layout ***/
.sidebar {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	width: 285px;
	height: 100vh;
	overflow-y: auto;
	background: var(--light);
	transition: 0.5s;
	z-index: 999;
}

.content {
	margin-left: 250px;
	min-height: 100vh;
	background: #ffffff;
	transition: 0.5s;
}

@media (min-width: 992px) {
	.sidebar {
		margin-left: 0;
	}

	.sidebar.open {
		margin-left: -250px;
	}

	.content {
		width: calc(100% - 250px);
	}

	.content.open {
		width: 100%;
		margin-left: 0;
	}
}

@media (max-width: 991.98px) {
	.sidebar {
		margin-left: -250px;
	}

	.sidebar.open {
		margin-left: 0;
	}

	.content {
		width: 100%;
		margin-left: 0;
	}
}

/*** Navbar ***/
.sidebar .navbar .navbar-nav .nav-link {
	padding: 7px 20px;
	color: var(--dark);
	font-weight: 500;
	border-left: 3px solid var(--light);
	border-radius: 0 30px 30px 0;
	outline: none;
}

.sidebar .navbar .navbar-nav .nav-link:hover,
.sidebar .navbar .navbar-nav .nav-link.active {
	color: var(--primary);
	background: #ffffff;
	border-color: var(--primary);
}

.sidebar .navbar .navbar-nav .nav-link i {
	width: 40px;
	height: 40px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	border-radius: 40px;
}

.sidebar .navbar .navbar-nav .nav-link:hover i,
.sidebar .navbar .navbar-nav .nav-link.active i {
	background: var(--light);
}

.sidebar .navbar .dropdown-toggle::after {
	position: absolute;
	top: 15px;
	right: 15px;
	border: none;
	content: "\f107";
	font-family: "Font Awesome 5 Free";
	font-weight: 900;
	transition: 0.5s;
}

.sidebar .navbar .dropdown-toggle[aria-expanded="true"]::after {
	transform: rotate(-180deg);
}

.sidebar .navbar .dropdown-item {
	padding-left: 25px;
	border-radius: 0 30px 30px 0;
}

.content .navbar .navbar-nav .nav-link {
	margin-left: 25px;
	padding: 12px 0;
	color: var(--dark);
	outline: none;
}

.content .navbar .navbar-nav .nav-link:hover,
.content .navbar .navbar-nav .nav-link.active {
	color: var(--primary);
}

.content .navbar .sidebar-toggler,
.content .navbar .navbar-nav .nav-link i {
	width: 40px;
	height: 40px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: #ffffff;
	border-radius: 40px;
}

.content .navbar .dropdown-toggle::after {
	margin-left: 6px;
	vertical-align: middle;
	border: none;
	content: "\f107";
	font-family: "Font Awesome 5 Free";
	font-weight: 900;
	transition: 0.5s;
}

.content .navbar .dropdown-toggle[aria-expanded="true"]::after {
	transform: rotate(-180deg);
}

@media (max-width: 575.98px) {
	.content .navbar .navbar-nav .nav-link {
		margin-left: 15px;
	}
}

/*** Date Picker ***/
.bootstrap-datetimepicker-widget.bottom {
	top: auto !important;
}

.bootstrap-datetimepicker-widget .table * {
	border-bottom-width: 0px;
}

.bootstrap-datetimepicker-widget .table th {
	font-weight: 500;
}

.bootstrap-datetimepicker-widget.dropdown-menu {
	padding: 10px;
	border-radius: 2px;
}

.bootstrap-datetimepicker-widget table td.active,
.bootstrap-datetimepicker-widget table td.active:hover {
	background: var(--primary);
}

.bootstrap-datetimepicker-widget table td.today::before {
	border-bottom-color: var(--primary);
}

/*** Testimonial ***/
.progress .progress-bar {
	width: 0px;
	transition: 2s;
}

/*** Testimonial ***/
.testimonial-carousel .owl-dots {
	margin-top: 24px;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.testimonial-carousel .owl-dot {
	position: relative;
	display: inline-block;
	margin: 0 5px;
	width: 15px;
	height: 15px;
	border: 5px solid var(--primary);
	border-radius: 15px;
	transition: 0.5s;
}

.testimonial-carousel .owl-dot.active {
	background: var(--dark);
	border-color: var(--primary);
}

/* Remove the background and border of the dropdown menu */
.no-bg-menu {
	background-color: transparent;
	border: none;
	padding: 0;
	box-shadow: none;
}

/* Style the dropdown items to look inline with Alert Data */
.no-bg-item {
	background-color: transparent;
	padding: 0 15px;
	color: inherit;
	display: block;
	font-size: 14px;
	/* Adjust size to match the parent */
	margin-left: 20px;
	/* Indent to show hierarchy */
	text-decoration: none;
}

.no-bg-item:hover {
	color: #007bff;
	/* Optional hover color */
	background-color: transparent;
	/* Prevent background on hover */
}

/* Ensure dropdown aligns vertically */
.nav-item .dropdown-menu {
	position: static;
	/* Align below Alert Data */
}

.nav-item .nav-link {
	font-size: 16px;
	/* Adjust size for parent */
}
</style>
