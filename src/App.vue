<script>
import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

export default {
	setup() {
		const userStore = useUserStore()
		const toastStore = useToastStore()

		return {
			userStore,
			toastStore
		}
	},

	data() {
		return {
			loading: true,
			modeuls: [],
			open: null,
		};
	},

	components: {
		Toast,
		RouterLink
	},

	mounted() {
		this.getModuls()
	},

	methods: {
		toggle(id) {
			this.open = this.open === id ? null : id
		},
		getModuls() {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('user.access')}`,
				}
			};
			axios
				.get('/api/videos/moduls/', config)
				.then(response => {
					console.log(response.data)
					this.modeuls = response.data['moduls']
				})
				.catch(error => {
					console.log('error', error)
				})
		},
		logout() {
			console.log('Log out')

			this.userStore.removeToken()

			this.$router.push('/login')
		},
	},

	beforeCreate() {
		this.userStore.initStore()

		const token = this.userStore.user.access
		console.log('data', this.userStore.user.get_avatar);

		if (token) {
			axios.defaults.headers.common["Authorization"] = "Bearer " + token;
		} else {
			axios.defaults.headers.common["Authorization"] = "";
			this.$router.push('/login')
		}
	},
}
</script>

<template>
	<template v-if="userStore.user.isAuthenticated && userStore.user.id">
		<div class="antialiased">
			<nav class="px-4 py-1 bg-gray-800 fixed left-0 right-0 top-0 z-50">
				<div class="flex flex-wrap justify-between items-center">
					<div class="flex p-1 justify-start items-center">
						<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar"
							aria-controls="default-sidebar" type="button"
							class="inline-flex items-center p-2 ml-3 text-sm text-gray-300 rounded-lg sm:hidden hover:bg-gray-600 focus:outline-none focus:ring-2">
							<span class="sr-only">Open sidebar</span>
							<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path clip-rule="evenodd" fill-rule="evenodd"
									d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
								</path>
							</svg>
						</button>
					</div>
					<div class="flex items-center lg:order-2">
						<RouterLink to="/profile"
							class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-gray-300 dark:focus:ring-gray-600"
							id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
							<span class="sr-only">Open user menu</span>
							<img class="w-8 h-8 rounded-full" :src="userStore.user.avatar" alt="user photo" />
						</RouterLink>
					</div>
				</div>
			</nav>
			<aside id="default-sidebar"
				class="fixed top-0 left-0 bg-gray-800 z-50 w-72 rounded-lg h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidenav">
				<div class="overflow-y-auto py-1 px-3 h-full">
					<ul class="space-y-1">
						<li class="py-2">
							<span class="flex-1p-2 font-semibold text-gray-100 ml-3 text-center">MODULS</span>
						</li>
						<li>
							<RouterLink v-if="this.$route['fullPath'] === '/'" to="/"
								class="flex items-center p-2 text-base text-gray-300 bg-gray-600 font-semibold rounded-full group">
								<svg class="ms-3 w-4 h-4 text-gray-300 transition duration-75" aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 22">
									<path
										d="M15.458 4a3 3 0 1 0-4.478 2.6A2.6 2.6 0 0 1 8.4 9H6.6a4.57 4.57 0 0 0-2.6.814v-3a3 3 0 1 0-2 0v8.368a3 3 0 1 0 2 0V13.6A2.607 2.607 0 0 1 6.6 11h1.8a4.6 4.6 0 0 0 4.548-4.049A3 3 0 0 0 15.458 4Z" />
								</svg>
								<span class="flex-1 ml-3 whitespace-nowrap">Cores</span>
							</RouterLink>
							<RouterLink v-else to="/"
								class="flex items-center p-2 text-base text-gray-300 hover:bg-gray-600 font-semibold rounded-full group">
								<svg class="ms-3 w-4 h-4 text-gray-300 transition duration-75" aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 22">
									<path
										d="M15.458 4a3 3 0 1 0-4.478 2.6A2.6 2.6 0 0 1 8.4 9H6.6a4.57 4.57 0 0 0-2.6.814v-3a3 3 0 1 0-2 0v8.368a3 3 0 1 0 2 0V13.6A2.607 2.607 0 0 1 6.6 11h1.8a4.6 4.6 0 0 0 4.548-4.049A3 3 0 0 0 15.458 4Z" />
								</svg>
								<span class="flex-1 ml-3 whitespace-nowrap">Cores</span>
							</RouterLink>
						</li>
						<li v-if="modeuls" v-for="menu in modeuls" :key="menu.id">
							<a class="flex items-center p-2 text-base text-gray-300 cursor-pointer hover:bg-gray-700 font-semibold rounded-full group"
								@click="toggle(menu.id)">
								<svg class="ms-3 w-4 h-4 text-gray-300 transition duration-75" aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
										stroke-width="2"
										d="M1 5h18M1 5v14h18V5M1 5V1h18v4M5 5l3-4m1.215 4 3-4m1.215 4 3-4M8.007 8v8l5.416-4-5.416-4Z" />
								</svg>
								<span class="flex-1 ml-3 text-left whitespace-nowrap">{{ menu.name }}</span>
								<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"></path>
								</svg>
							</a>
							<ul v-show="menu.id === open" class="py-2 space-y-2">
								<li v-for="video in menu.videos" :key="video.id">
									<a :href="`/video/${video.id}`"
										class="flex items-center p-2 pl-11 w-full text-sm font-medium text-gray-200 rounded-full transition group hover:bg-gray-700">
										<svg class="mr-2 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
											fill="currentColor" viewBox="0 0 14 16">
											<path
												d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
										</svg>
										{{ video.name }}
									</a>
								</li>
							</ul>
						</li>
						<li>
							<RouterLink v-if="this.$route['fullPath'] === '/profile'" to="/profile"
								class="flex items-center p-2 text-base text-gray-300 bg-gray-600 font-semibold rounded-full group">
								<img class="w-6 h-6 rounded-full ms-2 transition duration-75" :src="userStore.user.avatar"
									alt="user photo" />
								<span class="flex-1 ml-3 whitespace-nowrap">Profile</span>
							</RouterLink>
							<RouterLink v-else to="/profile"
								class="flex items-center p-2 text-base text-gray-300 hover:bg-gray-600 font-semibold rounded-full group">
								<img class="w-6 h-6 rounded-full ms-2 transition duration-75" :src="userStore.user.avatar"
									alt="user photo" />
								<span class="flex-1 ml-3 whitespace-nowrap">Profile</span>
							</RouterLink>
						</li>
					</ul>
					<div class="justify-start mt-5 ml-1 space-x-4 lg:flex">
						<a @click="logout"
							class="flex items-center p-2 text-base text-gray-300 cursor-alias bg-gray-700 hover:bg-gray-600 font-semibold rounded-full group">
							<svg class="ms-3 w-4 h-4 text-gray-300 transition duration-75" aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
									d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
							</svg>
							<span class="flex-1 ml-1 mr-3 whitespace-nowrap">Logout</span>
						</a>
					</div>
				</div>
			</aside>
		</div>

		<div class="">
			<Toast />
		</div>

		<main class="md:ml-72 mt-4 md:mt-0">
			<div class="pt-14"></div>
			<RouterView />
		</main>
	</template>
	<template v-else>
		<div class="">
			<Toast />
		</div>
		<main>
			<RouterView />
		</main>
	</template>
</template>