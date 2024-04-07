import { Component, OnInit } from '@angular/core';
import { Authdata } from '../../models/authdata.interface';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    user!: Authdata | null;

    constructor(private authSrv: AuthService) {}

    ngOnInit(): void {
        this.authSrv.user$.subscribe((user) => {
            this.user = user;
        });
    }

    logout() {
        this.authSrv.logout();
    }

}
