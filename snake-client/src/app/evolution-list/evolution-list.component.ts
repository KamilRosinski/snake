import {Component, OnInit} from '@angular/core';
import {EvolutionService} from '../services/evolution.service';
import {Observable} from 'rxjs';
import {Evolution} from '../shared/evolution';

@Component({
  selector: 'app-evolution-list',
  templateUrl: './evolution-list.component.html',
  styleUrls: ['./evolution-list.component.scss']
})
export class EvolutionListComponent implements OnInit {

  evolutions$: Observable<Evolution[]>;

  constructor(private readonly _evolutionService: EvolutionService) {
  }

  ngOnInit() {
    this.evolutions$ = this._evolutionService.getAllEvolutions();
  }

}
