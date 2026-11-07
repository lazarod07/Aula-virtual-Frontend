import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { Observable, tap } from 'rxjs';

@Service()
export class LoginService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = 'http://localhost:8080';

    login(credenciales: LoginRequest): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credenciales)
            .pipe(tap(response => {
                if(!response.token){
                    throw new Error('Usuario o contraseña incorrecta');
                }

                sessionStorage.setItem('access_token', response.token);
            }
        ));
    }

}
