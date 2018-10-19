import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { PeopleRepository } from 'app/services/repositories/people.repository';
import { Person } from 'app/models/person';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  isLoading = true;

  constructor(private _peopleRepository: PeopleRepository) { }

  ngOnInit() {
    this._peopleRepository.getAll(true)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(people => {
        this.people = people;
      }, err => {
        console.error('ERROR: ', err);
      });
  }

}
