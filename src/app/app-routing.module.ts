import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetsListComponent } from 'app/components/planets-list/planets-list.component';
import { PlanetInfoComponent } from 'app/components/planet-info/planet-info.component';
import { PeopleListComponent } from 'app/components/people-list/people-list.component';
import { PersonInfoComponent } from 'app/components/person-info/person-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/planets', pathMatch: 'full' },
  { path: 'planets', component: PlanetsListComponent },
  { path: 'planets/:id', component: PlanetInfoComponent },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/:id', component: PersonInfoComponent },
  { path: '**', redirectTo: '/planets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
