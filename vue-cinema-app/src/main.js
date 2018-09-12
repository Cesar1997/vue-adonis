import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
//vue resource : Nos permite realizar peticiones http al servidor, similar a axios
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/';
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
  next();
});
//.vue resource
//vuex
import Vuex from 'vuex'
Vue.use(Vuex);
//.vuex
//Blockui : Nos permite bloquear la patnalla cuando estemos realizando una peticion
import Blockui from 'vue-blockui'
Vue.use(Blockui);
//.blockui
//modulos y tipos
  import globalTypes from '@/types/global'
  import AuthModule from  '@/modules/auth'

//.modulos y tipos
//vee-validate : Nos sirve para manejar los errores en los componetes, o en la extension de vue en firefox o chrome
  import VeeValidate , {Validator} from 'vee-validate'
    import validatorEs from '@/validator/es';
    import validatorEn from  '@/validator/en';
    Validator.localize('es',validatorEs);
    Vue.use(VeeValidate)
//.vee-validate
//vue-tables-2 
    import {ClientTable} from 'vue-tables-2'
    Vue.use(ClientTable,{}, false, 'bootstrap3','default');
//.vue-tables-2
//almacen global de datos con vuex
export const store = new Vuex.Store({
  state: {
    processing : false,
    language : 'es'
  },
  actions: {
    [globalTypes.actions.changeLanguage] : ({commit},lang) => {
      commit(globalTypes.mutations.setLanguage,lang)
      switch(lang) {
        case 'en' : {
          Validator.localize('en',validatorEn);
          break;
        }
        case 'es' : {
          Validator.localize('es',validatorEs);
        }
      }
    }
  },
  getters: {
    [globalTypes.getters.processing] : state => state.processing,
    [globalTypes.getters.language] : state => state.language
  },
  mutations: {
    [globalTypes.mutations.startProcessing] (state) {
      state.processing = true
    },
    [globalTypes.mutations.stopProcessing] (state) {
      state.processing = false;
    },
    [globalTypes.mutations.setLanguage] (state,lang) {
      state.language = lang;
    }
  },
  modules: {
    AuthModule
  }
})

//.almacen global de datos con vuex

//vue traducciones : Crea de manera global las traducciones'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from '@/traslations';
const i18n = new VueI18n({
  locale : store.state.language,
  messages
})




//.vue traduccions


new Vue({
  el: '#app',
  render: h => h(App),
  store,
  i18n,
  router
})