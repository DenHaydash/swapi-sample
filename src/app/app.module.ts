import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetInfoComponent } from './components/planet-info/planet-info.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { MoviesDropdownComponent } from './components/movies-dropdown/movies-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetsListComponent,
    PlanetInfoComponent,
    PersonInfoComponent,
    PeopleListComponent,
    MoviesDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
