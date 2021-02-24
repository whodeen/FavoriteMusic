import { Injectable } from '@angular/core';
import { Album } from '../models/album/album.model';

const LOCALSTORAGE_KEY = '::favorite'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() {
    this.loadFavorites();
  }

  private favorites: Map<string, Album> = new Map<string, Album>();

  public addFavorite(album: Album) {
    this.favorites.set(album.artist + album.name, album);
    this.saveToLocalStorage(album);
  }

  public isFavorite(album: Album) {
    return this.favorites.has(album.artist + album.name);
  }

  public removeFavorite(album: Album) {
    this.favorites.delete(album.artist + album.name);
    this.removeFromLocalStorage(album);
  }

  public getLenght() {
    return this.favorites.size;
  }

  public getFavorites() {
    return Array.from(this.favorites.values());
  }

  private saveToLocalStorage(album: Album) {
    localStorage.setItem(album.artist + album.name + LOCALSTORAGE_KEY, JSON.stringify(album));
  }

  private removeFromLocalStorage(album: Album) {
    localStorage.removeItem(album.artist + album.name + LOCALSTORAGE_KEY);
  }

  private loadFavorites() {
    for(let key in localStorage) {
      if(key.includes(LOCALSTORAGE_KEY)) {
        let item = localStorage.getItem(key)
        this.addFavorite(JSON.parse(item));
      }
    }
  }
}
