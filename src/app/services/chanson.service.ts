import { Injectable } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GenreWrapper } from '../model/genreWrapped.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class chansonService {
  apiURL: string = 'http://localhost:5000/chansons/api';
  apiURLGen: string = 'http://localhost:5000/chansons/gen';

  chansons!: chanson[]; //un tableau de chanson
  chansonsRecherche!: chanson[];
  genres!: Genre[];

  constructor(private http: HttpClient) {
    // this.genres = [
    //   { idGen: 1, nomGen: 'HipHop' },
    //   { idGen: 2, nomGen: 'Pop' },
    //   { idGen: 3, nomGen: 'Rap' },
    //   { idGen: 4, nomGen: 'Rock' },
    //   { idGen: 5, nomGen: 'Musique électronique	' },
    //   { idGen: 6, nomGen: 'Jazz' },
    //   { idGen: 7, nomGen: 'Chanson française	' },
    //   { idGen: 8, nomGen: 'Autre' },
    // ];
    /*this.chansons = [
      {
        idChanson: 1,
        nomChanson: 'UZI',
        nomArtiste: 'A.L.A',
        email: 'ALA@gmail.com',
        duree: 4.36,
        vues: '6.7 M',
        dateSortie: new Date('08/20/2017'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 2,
        nomChanson: 'S.A.F.E',
        nomArtiste: 'A.L.A',
        email: 'ALA@gmail.com',
        duree: 5.22,
        vues: '22 M',
        dateSortie: new Date('07/27/2017'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 3,
        nomChanson: 'AADHEBI',
        nomArtiste: 'A.L.A',
        email: 'ALA@gmail.com',
        duree: 4.04,
        vues: '2.8 M',
        dateSortie: new Date('07/29/2024'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 4,
        nomChanson: 'Feu Rouge',
        nomArtiste: 'Samara',
        email: 'Samara@gmail.com',
        duree: 4.18,
        vues: '9.3 M',
        dateSortie: new Date('06/24/2024'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 5,
        nomChanson: 'Pour Les Gang',
        nomArtiste: 'Samara',
        email: 'Samara@gmail.com',
        duree: 5.08,
        vues: '46 M',
        dateSortie: new Date('05/14/2023'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
    ];*/
  }

  listeChanson(): Observable<chanson[]> {
    return this.http.get<chanson[]>(this.apiURL);
  }

  ajouterChanson(chan: chanson): Observable<chanson> {
    return this.http.post<chanson>(this.apiURL, chan, httpOptions);
  }

  supprimerChanson(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterChanson(id: number): Observable<chanson> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<chanson>(url);
  }

  trierChansons() {
    this.chansons = this.chansons.sort((n1, n2) => {
      if (n1.idChanson! > n2.idChanson!) {
        return 1;
      }
      if (n1.idChanson! < n2.idChanson!) {
        return -1;
      }
      return 0;
    });
  }

  updateChanson(chan: chanson): Observable<chanson> {
    return this.http.put<chanson>(this.apiURL, chan, httpOptions);
  }

  listeGenres(): Observable<GenreWrapper> {
    return this.http.get<GenreWrapper>(this.apiURLGen);
  }

  consulterGenre(id: number): Genre {
    return this.genres.find((gen) => gen.idGen == id)!;
  }

  rechercherParGenre(idGen: number): Observable<chanson[]> {
    const url = `${this.apiURL}/chansgen/${idGen}`;
    return this.http.get<chanson[]>(url);
  }

  rechercherParNom(nom: string): Observable<chanson[]> {
    const url = `${this.apiURL}/chansByName/${nom}`;
    return this.http.get<chanson[]>(url);
  }

  ajouterGenre(genre: Genre): Genre {
    const newId =
      this.genres.length > 0
        ? Math.max(...this.genres.map((gen) => gen.idGen ?? 0)) + 1
        : 1;
    genre.idGen = newId;
    this.genres.push(genre);
    return genre;
  }

  mettreAJourGenre(genre: Genre): void {
    const index = this.genres.findIndex((g) => g.idGen === genre.idGen);
    if (index !== -1) {
      this.genres[index] = genre;
    }
  }
}
