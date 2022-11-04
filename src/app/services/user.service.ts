import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient) { }

    register(username: string, email: string, password: string) {
        return this.http.post(`${environment.SOCKET_ENDPOINT}/user/register`,
                                { username, email, password },  
                                environment.httpOptions );
    }

    login(email: string, password: string) {
        return this.http.post(`${environment.SOCKET_ENDPOINT}/user/login`,
                                { email, password },  
                                environment.httpOptions );
    }

    getAllUsers() {
        
    }
    
}