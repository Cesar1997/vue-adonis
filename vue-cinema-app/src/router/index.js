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
import Login from '@/components/Auth/Login';
import Register from '@/components/Auth/Register';

//.types
//global Store
import {store} from '@/main';

//.store

//configurar el router
const router = new Router({
    routes :[
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {Auth : false,title : 'Iniciar sesion'},
            beforeEnter: (to,from,next) => {
                if(store.state.AuthModule.logged) {
                    next({path : '/'})
                } else {
                    next();
                }
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {Auth : false,title : 'Registrarme'},
            beforeEnter: (to,from,next) => {
                if(store.state.AuthModule.logged) {
                    next({path : '/'})
                } else {
                    next();
                }
            }
        }
    ]
})
//.configurar router
router.beforeEach((to,from,next) => {
    document.title = to.meta.title;
    if(to.meta.Auth && !store.state.AuthModule.logged){
        next({path: '/login'});
    } else if(store.state.AuthModule.logged) { //seteamos el usuario que esta autenticado en cada peticion 
        store.commit(authTypes.mutations.setUser);
    }
    next();
})
export default router;



