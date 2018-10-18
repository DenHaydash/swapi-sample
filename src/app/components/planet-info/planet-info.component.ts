import { Component, OnInit } from '@angular/core';
import { PlanetsRepositoryService } from '../../services/repositories/planets.repository.service';
import { Planet } from '../../models/planet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-info',
  templateUrl: './planet-info.component.html',
  styleUrls: ['./planet-info.component.scss']
})
export class PlanetInfoComponent implements OnInit {

  planet: Planet = null;
  isLoading = true;

  constructor(private _platentsRepository: PlanetsRepositoryService,
              private _activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._platentsRepository.get(+this._activedRoute.snapshot.paramMap.get('id')).subscribe(planet => {
      this.planet = planet;
      this.isLoading = false;
    }, (ex) => {
      console.error("ERROR: ", ex);
      this.isLoading = false;
    });
  }

}
