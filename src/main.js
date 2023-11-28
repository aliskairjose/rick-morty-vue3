import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import routerV from './router'; // no se importa /index por ser el indice


createApp(App).use(routerV).mount('#app')

