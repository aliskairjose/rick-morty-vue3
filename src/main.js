import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routerV from './router'; // no se importa /index por ser el indice
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

createApp(App).use(routerV).use(VueAwesomePaginate).mount('#app')

