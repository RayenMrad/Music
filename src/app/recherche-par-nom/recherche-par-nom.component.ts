import { Component, OnInit } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { chansonService } from '../services/chanson.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent implements OnInit {
  chansons!: chanson[];
  nomChanson!: string;
  allChansons!: chanson[];
  searchTerm!: string;

  constructor(private chansonService: chansonService) {}

  ngOnInit(): void {
    this.chansons = this.chansonService.listeChansons();
  }

  // rechercherChans() {
  //   this.chansonService.rechercherParNom(this.nomChanson).subscribe((chans) => {
  //     console.log(chans);
  //     this.chansons = chans;
  //   });
  // }
  onKeyUp(filterText: string) {
    this.chansons = this.allChansons.filter((item) =>
      item.nomChanson.toLowerCase().includes(filterText)
    );
  }
}
