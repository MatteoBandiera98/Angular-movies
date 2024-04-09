import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authdata, Favourite, Genres, Movie } from '../../models/authdata.interface';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {
  favorites: Favourite[] = [];
  movies: Movie[] = []
  user!: Authdata|null;
  imageURL = environment.imageURL
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

  constructor(private router: Router, private movieSrv:UserService, private userSrv:AuthService) { }

  ngOnInit(): void {
    this.userSrv.user$.subscribe((value) => {
      this.user = value;
      if (value) {
        this.movieSrv.recuperaFavoriti(value.user.id).subscribe(async (favorites) => {
          this.favorites = favorites
          await this.refresh()
        })
      }
    })
  }

  async refresh() {
    let films = await this.movieSrv.recuperaFilm().toPromise()
    if (films) {
      this.movies = films.filter((movie) => {
        let find = this.favorites.find((favorite) => favorite.movieId == movie.id)
        if (find) {
          return true
        }
        return false
      })
    }
  }

  getGenres(genreIds: number[]): string {
    return genreIds.map(id => this.genres[id]).join(', ');
  }

  removeFromFavorites(id: number) {
    if (this.user !== null) {
      let find = this.favorites.find((value) => value.movieId === id)
      if (find!== undefined) {
        this.favorites = this.favorites.filter(favorite => favorite.id !== find.id);
        this.refresh()
        if (find.id) {
          this.movieSrv.rimuoviFavorito(find.id).subscribe()
        }
      }
    }
  }
}
