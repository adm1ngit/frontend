<script setup>
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
</script>

<template>
    <div v-if="store.isVisible"
        class="transition ease-in-out delay-500 duration-500 fixed z-50 top-0 flex items-center m-4 p-4 mb-4 text-sm text-white rounded-lg"
        :class="store.classes" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">{{ store.info }}!</span> {{ store.message }}
        </div>
    </div>
</template>