import { Component, OnInit } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { chansonService } from '../services/chanson.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-chanson',
  templateUrl: './add-chanson.component.html',
})
export class AddChansonComponent implements OnInit {
  newchanson = new chanson();
  message: string = '';

  genres!: Genre[];

  newIdGen!: number;
  newGenre!: Genre;
  myForm!: FormGroup;

  constructor(
    private chansonService: chansonService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.genres = this.chansonService.listeGenres();
    this.myForm = this.formBuilder.group({
      idChanson: ['', [Validators.required]],
      nomChanson: ['', [Validators.required]],
      nomArtiste: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      duree: ['', [Validators.required]],
      vues: ['', [Validators.required]],
      dateSortie: ['', [Validators.required]],
      idGen: [this.newGenre!],
    });
  }

  addchanson() {
    console.log(this.newIdGen);
    this.newGenre = this.chansonService.consulterGenre(this.newIdGen);
    this.newchanson.genre = this.newGenre;
    this.chansonService.ajouterchanson(this.newchanson);
    //this.message =
    // 'chanson ' + this.newchanson.nomChanson + ' ajouté avec succès !'; // Added spaces for readability
    this.router.navigate(['chansons']);
  }
}
