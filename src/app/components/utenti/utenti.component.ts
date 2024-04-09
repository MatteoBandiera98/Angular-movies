import { Component , OnInit } from '@angular/core';
import { UtentiService } from '../../service/utenti.service';
import { Register } from '../../models/register.interface';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrl: './utenti.component.scss'
})
export class UtentiComponent implements OnInit {
  listaUtenti: Register[] | undefined;

  constructor(private utentiSrv: UtentiService) {
      setTimeout(() => {
          this.utentiSrv.recuperaUtenti().subscribe((utenti: Register[]) => {
              this.listaUtenti = utenti;
          });
      }, 1500);
  }

  ngOnInit(): void {}
}

