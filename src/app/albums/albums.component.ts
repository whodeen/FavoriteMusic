import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Genre } from '../shared/enums/genre';
import { Album } from '../shared/models/album/album.model';
import { AlbumsService } from '../shared/services/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {

  constructor(private albumsService: AlbumsService, private route: ActivatedRoute) {
    let genreName = this.route.snapshot.params['type'];
    this.genre = Genre[genreName];

    this.albumsService.getAlbumsByGenre(this.genre).subscribe((response: any) => 
      this.albums = response.albums.album.map((album: any) =>
        new Album(
          album.mbid,
          album.name,
          album.artist.name,
          album.image.find(image => image.size == 'medium')['#text'])
        )
    );
  }

  public albums: Album[];
  private genre: Genre;
}
