import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/token.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/auth.guard';
import { PreferitiComponent } from './components/preferiti/preferiti.component';
import { UserService } from './service/user.service';
import { DettagliComponent } from './components/dettagli/dettagli.component';
import { UtentiComponent } from './components/utenti/utenti.component';
import { DescrizioneFilmComponent } from './components/descrizione-film/descrizione-film.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'preferiti',
    component: PreferitiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dettagli',
    component: DettagliComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'utenti',
    component: UtentiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'descrizione',
    component: DescrizioneFilmComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    PreferitiComponent,
    DettagliComponent,
    UtentiComponent,
    DescrizioneFilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    RouterModule.forRoot(routes),
    HttpClientModule ,
    FormsModule , 
    ReactiveFormsModule ,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['example.com'],
        disallowedRoutes: ['example.com/examplebadroute/']
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    UserService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
