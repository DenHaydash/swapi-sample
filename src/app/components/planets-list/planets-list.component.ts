import { Component, OnInit } from '@angular/core';
import { PlanetsRepositoryService } from '../../services/repositories/planets.repository.service';
import { Planet } from '../../models/planet';

@Component({
  selector: 'app-planets-list',
  templateUrl: './planets-list.component.html',
  styleUrls: ['./planets-list.component.scss']
})
export class PlanetsListComponent implements OnInit {

  planets: Planet[] = [];
  isLoading = true;

  constructor(private _planetsRepository: PlanetsRepositoryService) { }

  ngOnInit() {
    this._planetsRepository.getAll(true).subscribe(planets => {
      this.planets = planets;
      this.isLoading = false;
    }, (ex) => {
      console.error("ERROR: ", ex);
      this.isLoading = false;
    });
  }

}
