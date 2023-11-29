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

    components: {
        Toast,
        RouterLink
    },

    data() {
        return {
            video: [],
            video_access: true,
            errors: [],
            add_access: '',
            access_video: false,
            body: '',
        }
    },

    mounted() {
        this.getFeed()
    },

    methods: {
        getFeed() {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('user.access')}`,
                }
            };
            axios
                .get(`/api/videos/video/${this.$route.params.id}/`, config)
                .then(response => {
                    if (response.data['data'] === 'Video not access') {
                        this.video_access = true
                        this.access_video = true
                    } else {
                        console.log(response.data)
                        this.video = response.data['video']
                        this.video_access = false
                    }

                })
                .catch(error => {
                })
        },
        async AddAccess(id) {
            if ((localStorage.getItem('user.access'))) {
                const config = {
                    headers: {
                        'Authorization': `JWT ${localStorage.getItem('user.access')}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                };
                const video_id = id;
                const body = JSON.stringify({
                    video_id
                });
                axios
                    .post(`/api/videos/video-mark/${this.$route.params.id}/`, body, config)
                    .then(response => {
                        this.toastStore.showToast(3000, 'Dars yakunlandi.', 'Jarayon', 'bg-blue-700')
                        if (response.status === 202) {
                            this.add_access = response.data['data']
                        }
                    })
                    .catch(error => {
                    })
            } else {
                this.toastStore.showToast(3000, "Please, Log In", 'Unauthorized', 'bg-red-500 text-white');
            }
        },
        submitForm(videoId) {
            const config = {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('user.access')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            };
            axios
                .post('/api/videos/create-comment/', { 'body': this.body, 'videoId': videoId }, config)
                .then(response => {
                    this.toastStore.showToast(3000, "Izoh mofaqqiyatli jo'natildi.", 'Izoh', 'bg-blue-700')
                    this.body = ''
                })
                .catch(error => {
                    console.log('error', error)
                })
        },
    }
}
</script>

<template>
    <div v-if="access_video">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h3 class="mb-4 text-4xl tracking-tight font-extrabold text-white">Ushbu Video Ochilmagan!</h3>
            <p class="font-light lg:mb-16 sm:text-xl text-gray-100">
                Iltimos bundan oldingi videolarni ko'rib keling.
            </p>
        </div>
    </div>
    <div v-if="video_access">
        <div class="bg-gray-800 ml-4 mr-4 rounded-xl">
            <div class="py-3 px-1 mx-1 w-full">


                <svg class="h-12 mx-auto mb-3 text-gray-500" viewBox="0 0 24 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor" />
                </svg>
                <div role="status"
                    class="flex m-5 items-center justify-center h-72 max-w-sm bg-gray-600 rounded-lg animate-pulse dark:bg-gray-700">
                    <svg class="w-10 h-10 text-gray-300 dark:text-gray-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        <path
                            d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>

                <div role="status" class="animate-pulse">
                    <div class="h-2.5 bg-gray-500 rounded-full max-w-[640px] mb-2.5 mx-auto"></div>
                    <div class="h-2.5 mx-auto bg-gray-500 rounded-full max-w-[540px]"></div>
                    <div class="flex items-center justify-center mt-4">
                        <svg class="w-8 h-8 text-gray-200 dark:text-gray-700 me-4" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div class="w-20 h-2.5 bg-gray-300 rounded-full me-3"></div>
                        <div class="w-24 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <span class="sr-only">Loading...</span>
                </div>

            </div>
        </div>
    </div>
    <div v-else>
        <section class="ml-4 mr-4">
            <div class="bg-gray-800 relative overflow-hidden rounded-lg">
                <div class="flex justify-between items-start p-5">
                    <h2 class="text-gray-100 inline-flex items-center font-semibold text-xl">{{ video.name }}</h2>
                    <p @click="AddAccess(video.id)"
                        class="text-xl tracking-tight inline-flex items-center mb-1 text-gray-900 cursor-pointer">
                        <span
                            class="bg-blue-600 hover:bg-blue-800 text-gray-100 text-xs font-medium me-2 px-2.5 py-2.5 rounded">
                            Darsni yakunlash
                        </span>
                    </p>
                </div>
                <div class="px-8 pb-4">
                    <video class="w-full h-auto max-w-full rounded-lg" controls
                        poster="https://qosnetworking.com/wp-content/uploads/2023/05/video-poster-768x432.jpg">
                        <source :src="video.video" type="video/mp4">
                        Browseringiz ushbu videoni ocha olmaydi.
                    </video>
                </div>
            </div>
        </section>
        <section class="m-4">
            <div class="bg-gray-800 relative overflow-hidden rounded-lg">
                <div class="overflow-x-auto">
                    <div class="py-4 px-4 mx-auto max-w-screen-xl">
                        <div class="max-w-screen-lg text-gray-100 sm:text-lg">
                            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-100">
                                {{ video.name }}
                            </h2>
                            <p class="mb-4 font-light">
                                {{ video.description }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="m-3 border-t"></div>
                <form v-on:submit.prevent="submitForm(video.id)" method="post" class="m-6 text-white">
                    <div class="grid gap-4 mb-4 sm:grid-cols-2">
                        <div class="sm:col-span-2">
                            <label for="description" class="block mb-2 text-sm font-medium text-white">Izoh</label>
                            <textarea id="description" v-model="body" rows="1" required
                                class="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Fikirlaringizni yozing..."></textarea>
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Jo'natish
                    </button>
                </form>
                <template v-if="video.comment">
                    <div class="m-3 border-t"></div>
                    <h4 class="text-white ml-4 mr-4 text-2xl mb-4">Fikirlar va Savollar</h4>
                    <div class="ml-4 mr-4 grid grid-cols-1 gap-x-4 gap-y-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <article v-for="com in video.comment" :key="com.id"
                            class="flex max-w-xl flex-col items-start justify-between bg-gray-600 rounded-lg p-4">
                            <div class="group relative">
                                <p class="line-clamp-3 text-sm leading-6 text-white">
                                    {{ com.comment }}
                                </p>
                            </div>
                        </article>
                    </div>
                    <div class="m-3 border-b"></div>
                </template>
                <nav class="flex justify-between items-start p-5" aria-label="Pagination">
                    <template v-if="video.id !== 1">
                        <a :href="`/video/${video.id - 1}`"
                            class="inline-flex items-center font-medium text-gray-100 hover:text-gray-500">
                            <svg class="mr-1 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4" />
                            </svg>
                            Oldingi
                        </a>
                    </template>
                    <a :href="`/video/${video.id + 1}`"
                        class="inline-flex items-center font-medium text-gray-100 hover:text-gray-500">
                        Kiyingi
                        <svg class="ml-1 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </nav>
            </div>
        </section>
    </div>
</template>