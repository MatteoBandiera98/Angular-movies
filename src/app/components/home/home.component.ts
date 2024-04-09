import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { UserService } from '../../service/user.service';
import { Auth, Favourite, Genres } from '../../models/authdata.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  favorites: Favourite[] = [];
  isLoaded = false;
  user!: Auth|null;
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

  constructor(private http: HttpClient, private utentiSrv: AuthService, private movieSrv: UserService) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiURL}movies-popular`).subscribe(
      data => {
        this.movies = data;
      },
      error => {
        console.error('An error occurred while fetching movies:', error);
      }
    );

    this.utentiSrv.user$.subscribe((value) => {
      this.user = value;
      if (value) {
        this.movieSrv.recuperaFavoriti(value.user.id).subscribe((value) => {
          console.log(value)
          this.favorites = value;
          this.isLoaded = true
        })
      }
    })
  }

  getMoviePosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  getGenres(genreIds: number[]): string {
    return genreIds.map(id => this.genres[id]).join(', ');
  }

  addToFavorites(movie: any): void {
    console.log(this.user)
    if (this.user !== null) {
      if (!this.isInFavorites(movie)) {
        let favorite: Favourite = {
          userId: this.user.user.id,
          movieId: movie.id
        }
        this.movieSrv.aggiungiFavorito(favorite).subscribe((value) => {
          this.favorites.push(value)
        });
      } else {
        let find = this.favorites.find((value) => value.movieId === movie.id)
        if (find!== undefined) {
          this.removeFromFavorites(find);
        }
      }
    }
  }

  isInFavorites(movie: any): boolean {
    console.log(this.favorites)
    return this.favorites.some(favorite => favorite.movieId === movie.id);
  }

  removeFromFavorites(favoriteP: Favourite): void {
    this.favorites = this.favorites.filter(favorite => favorite.id !== favoriteP.id);
    if (favoriteP.id) {
      this.movieSrv.rimuoviFavorito(favoriteP.id).subscribe()
    }
  }
}
