import { Component, OnInit } from '@angular/core';
import { PeopleRepositoryService } from '../../services/repositories/people.repository.service';
import { Person } from '../../models/person';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  isLoading = true;

  constructor(private _peopleRepository: PeopleRepositoryService) { }

  ngOnInit() {
    this.isLoading = true;
    this._peopleRepository.getAll(true).subscribe(people => {
      this.people = people;
      this.isLoading = false;
    }, (ex) => {
      console.error("ERROR: ", ex);
      this.isLoading = false;
    });
  }

}
