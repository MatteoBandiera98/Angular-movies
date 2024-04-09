import { Component, OnInit } from '@angular/core';

import { UtentiService } from '../../service/utenti.service';
import { Register } from '../../models/register.interface';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss']
})
export class DettagliComponent implements OnInit {
 
  utente!: Register;
  id!: number
  datiLocal: any;

  constructor(private utentiSrv: UtentiService) {
      const user: any = localStorage.getItem('user');
      this.datiLocal = JSON.parse(user);
      this.id = this.datiLocal.user.id;
      this.utentiSrv.recuperaUtente(this.id).subscribe((data) => {
          this.utente = data;
      });
  }

  ngOnInit(): void {}
}
