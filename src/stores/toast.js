import { defineStore } from 'pinia'

export const useToastStore = defineStore({
    id: 'toast',

    state: () => ({
        ms: 0,
        message: '',
        info: '',
        classes: '',
        isVisible: false
    }),

    actions: {
        showToast(ms, message, info, classes) {
            this.ms = parseInt(ms)
            this.message = message
            this.info = info
            this.classes = classes
            this.isVisible = true

            setTimeout(() => {
                this.classes += ''
            }, 10)

            setTimeout(() => {
                this.classes = this.classes.replace('', '')
            }, this.ms - 500)

            setTimeout(() => {
                this.isVisible = false
            }, this.ms)
        }
    }
})