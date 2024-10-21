import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chansonService } from '../services/chanson.service';
import { chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-chanson',
  templateUrl: './update-chanson.component.html',
  styles: [],
})
export class UpdateChansonComponent implements OnInit {
  currentChanson = new chanson();
  genres!: Genre[];
  updatedGenId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: chansonService
  ) {}
  ngOnInit() {
    this.genres = this.chansonService.listeGenres();
    // console.log(this.route.snapshot.params.id);
    this.currentChanson = this.chansonService.consulterChanson(
      this.activatedRoute.snapshot.params['id']
    );
    //problem 1
    this.updatedGenId = this.currentChanson.genre.idGen!;
  }
  updateChanson() {
    this.currentChanson.genre = this.chansonService.consulterGenre(
      this.updatedGenId
    );

    //console.log(this.currentChanson);
    this.chansonService.updateChanson(this.currentChanson);
    this.router.navigate(['chansons']);
  }
}
