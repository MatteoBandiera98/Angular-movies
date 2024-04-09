import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Register } from '../models/register.interface';
import { Auth } from '../models/authdata.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UtentiService {
    utente!: Auth;
    private authSubj = new BehaviorSubject<null | Auth>(null);
    user$ = this.authSubj.asObservable();
  apiURL = environment.apiURL;

    constructor(private http: HttpClient) {}

    recuperaUtenti() {
        return this.http.get<Register[]>(`${this.apiURL}users`);
    }

    recuperaUtente(id: number) {
        return this.http.get<Register>(`${this.apiURL}users/${id}`);
    }
}

