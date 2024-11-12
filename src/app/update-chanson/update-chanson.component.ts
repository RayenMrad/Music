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
  updatedIdGen!: number;
  myForm!: FormGroup;
  idGen!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: chansonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // Load genres list
    this.genres = this.chansonService.listeGenres();

    // Initialize form with chanson data
    this.myForm = this.formBuilder.group({
      idChanson: ['', [Validators.required, Validators.minLength(1)]],
      nomChanson: ['', [Validators.required]],
      nomArtiste: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      duree: ['', [Validators.required]],
      vues: ['', [Validators.required, Validators.min(1)]],
      dateSortie: ['', [Validators.required]],
      genre: ['', [Validators.required]],
    });

    // Fetch the current chanson using route params
    this.currentChanson = this.chansonService.consulterChanson(
      this.activatedRoute.snapshot.params['id']
    );

    this.updatedIdGen = this.currentChanson.genre?.idGen ?? 0;
    console.log(this.currentChanson);
  }

  updateChanson() {
    this.currentChanson.genre = this.chansonService.consulterGenre(
      this.updatedIdGen
    );

    this.chansonService.updateChanson(this.currentChanson);
    this.router.navigate(['chansons']);
  }
}
