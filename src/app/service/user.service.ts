import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiURL ;

  constructor(private http: HttpClient) { }
}
