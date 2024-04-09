import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../service/user.service';

interface Genres {
  [key: number]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];
  genres: Genres = {
    28: 'azione',
    12: 'avventura',
    16: 'animazione',
    35: 'commedia',
    80: 'crime',
    99: 'documentario',
    18: 'dramma',
    10751: 'famiglia',
    14: 'fantasy',
    36: 'storia',
    27: 'horror',
    10402: 'musica',
    9648: 'mistero',
    10749: 'romance',
    878: 'fantascienza',
    10770: 'televisione film',
    53: 'thriller',
    10752: 'guerra',
    37: 'western'
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

  addToFavorites(movie: any): void {
    if (!this.isInFavorites(movie)) {
      this.favorites.push(movie);
    } else {
      this.removeFromFavorites(movie);
    }
  }

  isInFavorites(movie: any): boolean {
    return this.favorites.some(favorite => favorite.id === movie.id);
  }

  removeFromFavorites(movie: any): void {
    this.favorites = this.favorites.filter(favorite => favorite.id !== movie.id);
  }
}
