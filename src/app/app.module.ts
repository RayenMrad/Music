import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChansonsComponent } from './chansons/chansons.component';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';

@NgModule({
  declarations: [AppComponent, ChansonsComponent, AddChansonComponent, UpdateChansonComponent, RechercheParGenreComponent, RechercheParNomComponent, SearchFilterPipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
