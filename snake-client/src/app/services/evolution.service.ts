import {Injectable} from '@angular/core';
import {Evolution} from '../shared/evolution';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {

  getAllEvolutions(): Observable<Evolution[]> {
    return of([{id: 2}, {id: 3}, {id: 5}, {id: 7}, {id: 11}]);
  }

}
