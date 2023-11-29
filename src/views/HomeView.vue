<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            loading: true,
            modeuls: [],
            videos: [],
        };
    },

    mounted() {
        this.getModuls()
        this.getFeed()
    },

    methods: {
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
                    this.loading = false
                })
                .catch(error => {
                    console.log('error', error)
                })
        },
        getFeed() {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('user.access')}`,
                }
            };
            axios
                .get('/api/videos/', config)
                .then(response => {
                    console.log(response.data)
                    this.videos = response.data['videos']
                    this.loading = false
                })
                .catch(error => {
                    console.log('error', error)
                })
        },
    }
})
</script>


<template>
    <div class="bg-gray-800 ml-4 mr-4 rounded-xl" v-if="loading">
        <div class="py-3 px-1 mx-1 w-full">

            <svg class="h-12 mx-auto mb-3 text-gray-500" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor" />
            </svg>

            <div role="status"
                class="max-w-full p-4 m-5 space-y-4 border border-gray-500 divide-y divide-gray-600 rounded shadow animate-pulse">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="h-2.5 bg-gray-500 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-500 rounded-full w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-500 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-500 rounded-full w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-500 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-500 rounded-full w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-500 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-500 rounded-full w-12"></div>
                </div>
                <div class="flex items-center justify-between pt-4">
                    <div>
                        <div class="h-2.5 bg-gray-500 rounded-full w-24 mb-2.5"></div>
                        <div class="w-32 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="h-2.5 bg-gray-500 rounded-full w-12"></div>
                </div>
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
    <section class="bg-gray-800 ml-4 mr-4 rounded-xl" v-else>
        <div class="p-5 text-center">
            <div class="md:p-12 p-3 shadow bg-gradient-to-r from-[#2b2b45] to-[#0d0852] rounded-xl">
                <h3 class="text-2xl font-serif font-semibold leading-7 text-gray-200">NOXONFX ONLAYN TA’LIM PLATFORMASI</h3>
                <p class="text-xl font-mono mt-5 leading-8 text-gray-200">
                    Tradingga oid kasblarni o’rgatamiz
                </p>
            </div>
        </div>
        <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <figure class="max-w-screen-md mx-auto">
                <svg class="h-12 mx-auto mb-3 text-gray-400" viewBox="0 0 24 27" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                        fill="currentColor" />
                </svg>
                <blockquote>
                    <p class="text-2xl font-medium text-gray-100">
                        "Istalgan joyda, o’zingizga qulay vaqtda o’qish imkoniyati"
                    </p>
                </blockquote>
                <figcaption class="flex items-center justify-center mt-6 space-x-3">
                    <img class="w-6 h-6 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                        alt="profile picture">
                    <div class="flex items-center divide-x-2 divide-gray-500">
                        <div class="pr-3 font-medium text-gray-100">Micheal Gough</div>
                        <div class="pl-3 text-sm font-light text-gray-300">CEO at Google</div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
</template>

