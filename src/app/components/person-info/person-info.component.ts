import { Component, OnInit } from '@angular/core';
import { PeopleRepositoryService } from '../../services/repositories/people.repository.service';
import { Person } from '../../models/person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.scss']
})
export class PersonInfoComponent implements OnInit {

  person: Person = null;
  isLoading = true;

  constructor(private _peopleRepository: PeopleRepositoryService,
              private _activedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._peopleRepository.get(+this._activedRoute.snapshot.paramMap.get('id')).subscribe(planet => {
      this.person = planet;
      this.isLoading = false;
    }, (ex) => {
      console.error("ERROR: ", ex);
      this.isLoading = false;
    });
  }
}
