import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PlanetsRepository } from 'app/services/repositories/planets.repository';
import { Planet } from 'app/models/planet';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planet: Planet = null;
  isLoading = true;

  constructor(private _platentsRepository: PlanetsRepository,
              private _activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._platentsRepository.get(+this._activedRoute.snapshot.paramMap.get('id'))
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(planet => {
        this.planet = planet;
      }, err => {
        console.error('ERROR: ', err);
      });
  }

}
