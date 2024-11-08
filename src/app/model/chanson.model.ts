import { Genre } from './genre.model';

export class chanson {
  idChanson!: number;
  nomChanson!: string;
  nomArtiste!: string;
  duree!: number;
  vues!: string;
  dateSortie!: Date;
  genre!: Genre;
  email!: string;
}
