import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    vue: {
        compilerOptions: {
            isCustomElement: tag => ["marquee"].includes(tag)
        }
    },
    build: {
        transpile: [/echarts/],
    },
    ssr: false //保证 EChart 能正常工作
})
