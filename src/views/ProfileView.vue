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
    }
}
</script>

<template>
    <div class="relative transform overflow-hidden rounded-lg text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="px-4 pb-4">
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-start">
                <img class="w-20 h-20 rounded-full ms-2 transition duration-75" :src="userStore.user.avatar"
                    alt="user photo" />
                <div class="min-w-0 px-3">
                    <p class="text-sm font-semibold leading-6 text-gray-100">{{ userStore.user.name }}</p>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-100">{{ userStore.user.username }}</p>
                </div>
            </div>
            <div class="items-start justify-start md:hidden">
                <div class="mx-auto h-20 w-20 flex-shrink-0 items-start justify-start rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <img class="w-20 h-20 rounded-full ms-2 transition duration-75" :src="userStore.user.avatar"
                        alt="user photo" />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="min-w-0">
                        <p class="text-sm font-semibold leading-6 text-gray-100">{{ userStore.user.name }}</p>
                        <p class="mt-1 truncate text-xs leading-5 text-gray-100">{{ userStore.user.username }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>