import vue from 'vue';
import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);
//componentes

//TODO AÑADIR COMPONETNES

//.Componentes

//types

import authTypes from '@/types/auth';
import globalTypes from '@/types/global'


//.types
//global Store
import {store} from '@/main';

//.store

//configurar el router
const router = new Router({
    routes :[
        
    ]
})
//.configurar router
router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    if(to.data.Auth && !store.state.authModule.logged){
        next({path: '/login'});
    } else if(store.state.authModule.logged) {

    }
    next();
})
export default router;



