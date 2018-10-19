import { Component, OnInit } from '@angular/core';

import { RefDataRepository } from 'app/services/repositories/ref-data.repository';
import { Lookup } from 'app/models/lookup';

@Component({
  selector: 'app-movies-dropdown',
  templateUrl: './movies-dropdown.component.html',
  styleUrls: ['./movies-dropdown.component.scss']
})
export class MoviesDropdownComponent implements OnInit {

  moviesLookup: Lookup[] = [];
  selectedMovie: Lookup = null;

  constructor(private _refDataRepository: RefDataRepository) { }

  ngOnInit() {
    this._refDataRepository.getAll('films').subscribe(lookups => {
      this.moviesLookup = lookups;
    }, err => {
      console.error(err);
    });
  }

  onMovieChange(id: string): void {
    this._refDataRepository.get('films', id).subscribe(lookup => {
      this.selectedMovie = lookup;
    }, err => {
      console.error(err);
    });
  }
}
