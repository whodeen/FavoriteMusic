import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../shared/enums/genre';
import { Album } from '../shared/models/album/album.model';
import { AlbumsService } from '../shared/services/albums.service';
import { FavoriteService } from '../shared/services/favorite.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {

  constructor(private albumsService: AlbumsService, private route: ActivatedRoute, private favoriteService: FavoriteService) {
    this.route.params.subscribe(params => {
      let genreName = params['type'];
      this.genre = Genre[genreName];

      if (genreName == 'favorite') {
        this.albums = this.favoriteService.getFavorites();
      } else {
        this.albumsService.getAlbumsByGenre(this.genre).subscribe((response: any) => {
          this.albums = response.albums.album.map((album: any) => this.mapAlbum(album));
          this.resultedAlbums = this.albums.slice();
        }
        );
      }

    });
  }

  public resultedAlbums: Album[];
  public albums: Album[];
  private genre: Genre;

  public changeFavoriteState(album: Album) {
    if (album.isFavorite) {
      album.isFavorite = false;
      this.favoriteService.removeFavorite(album);
    } else {
      album.isFavorite = true;
      this.favoriteService.addFavorite(album);
    }
  }

  public getFavoriteLenght() {
    return this.favoriteService.getLenght();
  }

  public onSearch($event) {
    this.resultedAlbums = this.albums.filter(item => 
      item.name.toLowerCase().includes($event.target.value.toLowerCase())
    );
  }

  private mapAlbum(responce:any) {
    let result = new Album(
      responce.mbid,
      responce.name,
      responce.artist.name,
      responce.image.map(image => image['#text']))

    if (this.favoriteService.isFavorite(result)) {
      result.isFavorite = true;
    }

    return result
  }
}

