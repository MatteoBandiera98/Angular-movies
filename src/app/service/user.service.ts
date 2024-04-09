import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Favourite } from '../models/authdata.interface';
import { Movie } from '../models/authdata.interface';
import { UtentiService } from './utenti.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiURL;
 
  constructor(private http: HttpClient, private authsrv : UtentiService) { }

  
  recuperaFavoriti(userId: number) {
    return this.http.get<Favourite[]>(`${this.apiURL}favorites?userId=${userId}`);
}

recuperaFilm() {
    return this.http.get<Movie[]>(`${this.apiURL}movies-popular`);
}

dettaglioFilm(id: number) {
    return this.http.get<Movie>(`${this.apiURL}movies-popular/${id}`);
}

aggiungiFavorito(favorito: Favourite) {
    return this.http.post(`${this.apiURL}favorites`, favorito);
}

rimuoviFavorito(favoritoId: number) {
    return this.http.delete(`${this.apiURL}favorites/${favoritoId}`);
}
}
 

