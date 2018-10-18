import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetsListComponent } from './components/planets-list/planets-list.component';
import { PlanetInfoComponent } from './components/planet-info/planet-info.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonInfoComponent } from './components/person-info/person-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
  { path: 'planets', component: PlanetsListComponent },
  { path: 'planets/:id', component: PlanetInfoComponent },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/:id', component: PersonInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
