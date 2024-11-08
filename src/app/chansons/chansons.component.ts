import { Component, OnInit } from '@angular/core';
import { chanson } from '../model/chanson.model';
import { chansonService } from '../services/chanson.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chansons',
  templateUrl: './chansons.component.html',
})
export class ChansonsComponent implements OnInit {
  chansons: chanson[];
  constructor(
    private chansonService: chansonService,
    public authService: AuthService
  ) {
    this.chansons = chansonService.listeChansons();
  }
  supprimerChanson(ch: chanson) {
    //console.log(p);
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.chansonService.supprimerChanson(ch);
  }

  ngOnInit(): void {}
}
