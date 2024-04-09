import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { Movie } from '../../models/authdata.interface';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-descrizione-film',
  templateUrl: './descrizione-film.component.html',
  styleUrl: './descrizione-film.component.scss'
})
export class DescrizioneFilmComponent implements OnInit {
  film!: Movie;
  id!: number
  imageURL = environment.imageURL;

  constructor(private movieSrv: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
      this.route.params.subscribe(parametro => {
          this.id = +parametro['id'];
          this.dettagliFilm();
      });
  }

  dettagliFilm() {
      this.movieSrv.dettaglioFilm(this.id).subscribe(_film => {
          this.film = _film;
      });
  }
}
