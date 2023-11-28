import { createRouter, createWebHashHistory } from "vue-router";

import Characters from "../views/Characters.vue";
import Episodes from "../views/Episodes.vue";
import Locations from "../views/Locations.vue";

const routes = [
  { path: "/", name:'Characters', component: Characters },
  { path: "/episodes", name: 'Episodes',  component: Episodes },
  { path: "/locations", name: 'Locations', component: Locations }
];

const routerV = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default routerV;
