import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { PlanetsRepository } from 'app/services/repositories/planets.repository';
import { Planet } from 'app/models/planet';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  planets: Planet[] = [];
  isLoading = true;

  constructor(private _planetsRepository: PlanetsRepository) { }

  ngOnInit() {
    this._planetsRepository.getAll(true)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(planets => {
        this.planets = planets;
      }, err => {
        console.error('ERROR: ', err);
      });
  }

}
