import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../enums/genre';

const URL = 'http://ws.audioscrobbler.com/2.0/';
const API_KEY = '22e5dcb7293a23da484afeacce80c247';

@Injectable({
  providedIn: 'root'
})

export class AlbumsService {

  constructor(private http:HttpClient) { }

  public getAlbumsByGenre(genre: Genre, page: number = 1) {
    let url = this.generateUrl(genre, page, API_KEY);

    return this.http.get(url);
  }

  private generateUrl(tag: string, page: number, apiKey: string, format: string = 'json'): string {
    let method = '?method=tag.gettopalbums';

    return URL + method + '&tag=' + tag + '&page=' + page + '&api_key=' + apiKey + '&format=' + format;
  }
}
