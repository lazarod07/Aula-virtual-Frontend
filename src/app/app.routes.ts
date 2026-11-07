import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cursos } from './pages/cursos/cursos';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },
    {
        path: 'cursos',
        component: Cursos
    }
];
