<script>
import axios from 'axios'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

export default {
    setup() {
        const userStore = useUserStore();
        const toastStore = useToastStore();
        return {
            userStore,
            toastStore
        };
    },
    data() {
        return {
            form: {
                activate_code: ''
            },
            errors: []
        };
    },
    methods: {
        async submitForm() {
            this.errors = [];
            if (this.form.activate_code === '') {
                this.errors.push('Your e-mail is missing');
            }
            if (this.errors.length === 0) {
                await axios
                    .post('/api/auth/login/', this.form)
                    .then(response => {
                        this.userStore.setToken(response.data['data']);
                        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data['data'].access;

                        this.userStore.setUserInfo(response.data['user']);
                        location.assign('/')
                    })
                    .catch(error => {
                        console.log('error', error);
                        this.errors.push('The code is incorrect! Or the user is not registered!');
                    });
            }
            else {
                this.toastStore.showToast(2000, 'Something went wrong. Please try again', 'bg-gradient-to-r from-[#ff9797] to-[#ff4242]');
            }
        }
    },
    components: { RouterLink }
}
</script>


<template>
    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 lg:py-16 lg:px-6">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm text-gray-50" style="align-items: center;
                display: flex;
                flex-direction: column;
                justify-content: center;">
            <div>
                <h5 class="mb-3 text-base font-semibold text-dark md:text-xl">
                    Kodni Kiriting
                </h5>
            </div>
            <div class="mb-5 text-center">
                <p class="mt-2 text-xs text-dark">
                    <a class="font-extrabold" href="https://t.me/@noxonfx_uzbot">@noxonfx_uzbot</a> telegram botiga
                    kiring<br>va 1
                    daqiqalik kodingizni oling.
                </p>
            </div>
            <div class="w-full max-w-sm p-4 bg-gray-100 border border-gray-100 rounded-lg shadow-2xl sm:p-6">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div v-for="error in errors">
                        <div class="p-3 mb-2 text-xs text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                            role="alert">
                            <span class="font-medium">Error!</span> {{ error }}
                        </div>
                    </div>
                    <form class="space-y-6" v-on:submit.prevent="submitForm">
                        <div class="mb-2">
                            <label for="code" class="block mb-1 text-gray-900"
                                style="font-size: 0.6rem; line-height: 1rem;">
                                Code
                            </label>
                            <div class="flex mb-3">
                                <input type="tel" v-model="form.activate_code" id="code" maxlength="6"
                                    class="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
                                    required>
                            </div>
                        </div>
                        <button type="submit"
                            class="text-white bg-red-400 hover:bg-red-500 font-medium rounded-3xl text-sm w-full px-2 py-2 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
