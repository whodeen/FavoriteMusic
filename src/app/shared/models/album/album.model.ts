export class Album {
    public id: string;
    public name: string;
    public artist: string;
    public coverUrls: string;
    public isFavorite: boolean;

    constructor(id: string, name: string, artist: string, coverUrls: string, isFavorite: boolean = false) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.coverUrls = coverUrls;
        this.isFavorite = isFavorite;
    }
}