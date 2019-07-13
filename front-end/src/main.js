import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from './routes';

import './directives/Transform';

import msg from './pt_BR';
import VeeValidate, { Validator } from 'vee-validate';

Vue.use( VueRouter );

const router = new VueRouter({ 
    routes,
    mode: 'history' 
});

Vue.use( VueResource );

Vue.http.options.root = 'http://localhost:3000';

Vue.use(VeeValidate);

Validator.localize('pt_BR', msg);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
