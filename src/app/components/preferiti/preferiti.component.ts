import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrls: ['./preferiti.component.scss']
})
export class PreferitiComponent implements OnInit {
  favorites: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.favorites = this.getFavoritesFromLocalStorage(); 
  }

  getFavoritesFromLocalStorage(): any[] {
    
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      return JSON.parse(favoritesString);
    }
    return [];
  }

  removeFromFavorites(index: number): void {
    
    this.favorites.splice(index, 1);
    
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
