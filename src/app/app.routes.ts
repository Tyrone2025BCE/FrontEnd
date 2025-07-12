import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';

//export const routes: Routes = [];

export const routes: Routes = [
    {
        path:"",
        component:Home,
        title: "Inicio"
    },
    {
        path:"contacto",
        loadComponent(){
            return import('./contact/contact').then(m => m.Contact);
        },
        title:"Contactos"
    }

];
