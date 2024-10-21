import { Component, OnInit } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { chansonService } from '../services/chanson.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
})
export class RechercheParGenreComponent implements OnInit {
  chansons!: chanson[];
  genres!: Genre[];
  IdGenre!: number;
  constructor(private chansonService: chansonService) {}
  ngOnInit(): void {
    this.genres = this.chansonService.listeGenres();
    this.chansons = this.chansonService.listeChansons();
  }
  onChange() {
    // console.log(this.IdCategorie);
    this.chansons = this.chansonService.rechercherParGenre(this.IdGenre);
    console.log(this.chansons);
  }
  supprimerChanson(ch: chanson) {
    //console.log(p);
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.chansonService.supprimerChanson(ch);
  }
}
