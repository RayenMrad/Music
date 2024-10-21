import { Injectable } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';

@Injectable({
  providedIn: 'root',
})
export class chansonService {
  chansons: chanson[]; //un tableau de chanson
  chansonsRecherche!: chanson[];
  genres: Genre[];

  constructor() {
    this.genres = [
      { idGen: 1, nomGen: 'HipHop' },
      { idGen: 2, nomGen: 'Pop' },
      { idGen: 3, nomGen: 'Rap' },
      { idGen: 4, nomGen: 'Rock' },
      { idGen: 5, nomGen: 'Musique électronique	' },
      { idGen: 6, nomGen: 'Jazz' },
      { idGen: 7, nomGen: 'Chanson française	' },
      { idGen: 8, nomGen: 'Autre' },
    ];

    this.chansons = [
      {
        idChanson: 1,
        nomChanson: 'UZI',
        nomArtiste: 'A.L.A',
        duree: 4.36,
        vues: '6.7 M',
        dateSortie: new Date('08/20/2017'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 2,
        nomChanson: 'S.A.F.E',
        nomArtiste: 'A.L.A',
        duree: 5.22,
        vues: '22 M',
        dateSortie: new Date('07/27/2017'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 3,
        nomChanson: 'AADHEBI',
        nomArtiste: 'A.L.A',
        duree: 4.04,
        vues: '2.8 M',
        dateSortie: new Date('07/29/2024'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 4,
        nomChanson: 'Feu Rouge',
        nomArtiste: 'Samara',
        duree: 4.18,
        vues: '9.3 M',
        dateSortie: new Date('06/24/2024'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
      {
        idChanson: 5,
        nomChanson: 'Pour Les Gang',
        nomArtiste: 'Samara',
        duree: 5.08,
        vues: '46 M',
        dateSortie: new Date('05/14/2023'),
        genre: { idGen: 1, nomGen: 'HipHop' },
      },
    ];
  }
  listeChansons(): chanson[] {
    return this.chansons;
  }
  ajouterchanson(ch: chanson) {
    this.chansons.push(ch);
  }

  supprimerChanson(ch: chanson) {
    //supprimer le produit prod du tableau produits
    const index = this.chansons.indexOf(ch, 0);
    if (index > -1) {
      this.chansons.splice(index, 1);
    }
    //ou Bien
    /* this.produits.forEach((cur, index) => {
      if(prod.idProduit === cur.idProduit) {
      this.produits.splice(index, 1);
      }
      }); */
  }

  consulterChanson(id: number): chanson {
    return this.chansons.find((p) => p.idChanson == id)!;
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

  updateChanson(ch: chanson) {
    // console.log(ch);
    this.supprimerChanson(ch);
    this.ajouterchanson(ch);
    this.trierChansons();
  }

  listeGenres(): Genre[] {
    return this.genres;
  }

  consulterGenre(id: number): Genre {
    return this.genres.find((gen) => gen.idGen == id)!;
  }

  rechercherParGenre(idGen: number): chanson[] {
    this.chansonsRecherche = [];

    this.chansons.forEach((cur, index) => {
      if (idGen == cur.genre.idGen) {
        console.log('cur ' + cur);
        this.chansonsRecherche.push(cur);
      }
    });
    return this.chansonsRecherche;
  }

  rechercherParNom(nomChanson: string): chanson[] {
    this.chansonsRecherche = [];

    this.chansons.forEach((cur, index) => {
      if (nomChanson == cur.nomChanson) {
        console.log('cur ' + cur);
        this.chansonsRecherche.push(cur);
      }
    });
    return this.chansonsRecherche;
  }
}
