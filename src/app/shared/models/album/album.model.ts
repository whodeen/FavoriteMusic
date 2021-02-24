export class Album {
    public id: string;
    public name: string;
    public artist: string;
    public coverUrl: string;
    public isFavorite: boolean;

    constructor(id: string, name: string, artist: string, coverUrl: string, isFavorite: boolean = false) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.coverUrl = coverUrl;
        this.isFavorite = isFavorite;
    }
}