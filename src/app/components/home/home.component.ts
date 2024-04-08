import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../service/user.service';

interface Genres {
  [key: number]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movies: any[] = [];
  favorites: number[] = [];
  genres: Genres = {
    28: 'Azione',
    12: 'Avventura',
    16: 'Animazione',
   
  };

  constructor(private http: HttpClient ) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiURL}movies-popular`).subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.error('An error occurred while fetching movies:', error);
      }
    );
  }

  getMoviePosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getGenres(genreIds: number[]): string {
    return genreIds.map(id => this.genres[id]).join(', ');
  }

  addToFavorites(movieId: number): void {
    if (!this.favorites.includes(movieId)) {
      this.favorites.push(movieId);
    }
  }
}
