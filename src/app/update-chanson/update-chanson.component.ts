import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { chansonService } from '../services/chanson.service';
import { chanson } from '../model/chanson.model';
import { Genre } from '../model/genre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-update-chanson',
  templateUrl: './update-chanson.component.html',
  styles: [],
})
export class UpdateChansonComponent implements OnInit {
  currentChanson = new chanson();
  genres!: Genre[];
  updatedGenId!: number;
  myForm!: FormGroup;
  public user = new User();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private chansonService: chansonService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.genres = this.chansonService.listeGenres();
    // console.log(this.route.snapshot.params.id);
    this.currentChanson = this.chansonService.consulterChanson(
      this.activatedRoute.snapshot.params['id']
    );
    //problem 1
    this.updatedGenId = this.currentChanson.genre.idGen!;

    this.myForm = this.formBuilder.group({
      idChanson: ['', [Validators.required]],
      nomChanson: ['', [Validators.required]],
      nomArtiste: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      duree: ['', [Validators.required]],
      vues: ['', [Validators.required]],
      dateSortie: ['', [Validators.required]],
      idGen: [this.updatedGenId],
    });
  }
  updateChanson() {
    this.currentChanson.genre = this.chansonService.consulterGenre(
      this.updatedGenId
    );

    //console.log(this.currentChanson);
    this.chansonService.updateChanson(this.currentChanson);
    this.router.navigate(['chansons']);
  }

  OnRegister() {
    console.log(this.user);
  }
}
