import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chansonService } from '../services/chanson.service';
import { chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-chanson',
  templateUrl: './update-chanson.component.html',
  styles: [],
})
export class UpdateChansonComponent implements OnInit {
  currentChanson = new chanson();
  genres!: Genre[];
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: chansonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Load genres list
    this.genres = this.chansonService.listeGenres();

    // Fetch the current chanson using route params
    this.currentChanson = this.chansonService.consulterChanson(
      this.activatedRoute.snapshot.params['id']
    );

    // Initialize form with chanson data
    this.myForm = this.formBuilder.group({
      idChanson: [
        this.currentChanson.idChanson,
        [Validators.required, Validators.minLength(1)],
      ],
      nomChanson: [this.currentChanson.nomChanson, [Validators.required]],
      nomArtiste: [this.currentChanson.nomArtiste, [Validators.required]],
      email: [
        this.currentChanson.email,
        [Validators.required, Validators.email],
      ],
      duree: [this.currentChanson.duree, [Validators.required]],
      vues: [
        this.currentChanson.vues,
        [Validators.required, Validators.min(1)],
      ],
      dateSortie: [this.currentChanson.dateSortie, [Validators.required]],
      idGen: [this.currentChanson.genre.idGen, [Validators.required]],
    });
  }

  updateChanson() {
    // Update currentChanson with form values
    const updatedValues = this.myForm.value;
    this.currentChanson.idChanson = updatedValues.idChanson;
    this.currentChanson.nomChanson = updatedValues.nomChanson;
    this.currentChanson.nomArtiste = updatedValues.nomArtiste;
    this.currentChanson.email = updatedValues.email;
    this.currentChanson.duree = updatedValues.duree;
    this.currentChanson.vues = updatedValues.vues;
    this.currentChanson.dateSortie = updatedValues.dateSortie;
    this.currentChanson.genre = this.chansonService.consulterGenre(
      updatedValues.idGen
    );

    // Update chanson in the service and navigate
    this.chansonService.updateChanson(this.currentChanson);
    this.router.navigate(['chansons']);
  }
}
