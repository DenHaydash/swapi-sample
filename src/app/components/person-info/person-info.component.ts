import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { PeopleRepository } from 'app/services/repositories/people.repository';
import { Person } from 'app/models/person';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  person: Person = null;
  isLoading = true;

  constructor(private _peopleRepository: PeopleRepository,
              private _activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._peopleRepository.get(+this._activedRoute.snapshot.paramMap.get('id'))
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(planet => {
        this.person = planet;
      }, err => {
        console.error('ERROR: ', err);
      });
  }
}
