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
    this.chansonService.listeGenres().subscribe((gens) => {
      console.log(gens);
      this.genres = gens._embedded.genres;
    });

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

  addChanson() {
    this.newchanson.genre = this.genres.find(
      (gen) => gen.idGen == this.newIdGen
    )!;

    this.chansonService.ajouterChanson(this.newchanson).subscribe((chan) => {
      console.log(chan);
      this.router.navigate(['chansons']);
    });
  }
}
