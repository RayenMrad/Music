import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { chansonService } from '../services/chanson.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
})
export class ListeGenresComponent implements OnInit {
  genres!: Genre[];

  updatedGen: Genre = { idGen: 0, nomGen: '' };

  ajout: boolean = true;

  constructor(private chansonService: chansonService) {}
  ngOnInit(): void {
    this.chargerGenres();
  }

  ajouterGenre(nouveauGenre: Genre): void {
    this.chansonService.ajouterGenre(nouveauGenre);
    this.chargerGenres(); // Actualise l'affichage de la liste après l'ajout
  }

  genreUpdated(genre: Genre) {
    if (this.ajout) {
      this.chansonService.ajouterGenre(genre);
    } else {
      this.chansonService.mettreAJourGenre(genre);
      this.ajout = true; // Réinitialise le mode d'ajout
    }
    this.chargerGenres();
  }

  chargerGenres(): void {
    this.chansonService.listeGenres().subscribe((gens) => {
      console.log(gens);
      this.genres = gens._embedded.genres;
    });
    console.log(this.genres);
  }

  updateGen(gen: Genre) {
    this.updatedGen = gen;
    this.ajout = false;
  }
}
