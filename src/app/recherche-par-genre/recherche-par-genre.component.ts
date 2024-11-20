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
    this.chansonService.listeGenres().subscribe((gens) => {
      this.genres = gens._embedded.genres;
      console.log(gens);
    });
  }
  onChange() {
    this.chansonService.rechercherParGenre(this.IdGenre).subscribe((chans) => {
      this.chansons = chans;
    });
  }

  supprimerChanson(ch: chanson) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.chansonService.supprimerChanson(ch.idChanson).subscribe(() => {
        // Met à jour la liste des chansons après la suppression
        this.chansons = this.chansons.filter(
          (c) => c.idChanson !== ch.idChanson
        );
        console.log('Chanson supprimée');
      });
    }
  }
}
