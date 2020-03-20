import {Injectable} from '@angular/core';
import {Evolution} from '../models/evolution.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EvolutionService {

    private static readonly URL: string = '/api/evolution';

    constructor(private readonly http: HttpClient) {
    }

    getAllEvolutions(): Observable<Evolution[]> {
        return this.http.get<Evolution[]>(`${EvolutionService.URL}/all`);
    }

    createEvolution(): Observable<Evolution> {
        return this.http.post<Evolution>(EvolutionService.URL, null);
    }

    deleteEvolution(evolutionId: number): Observable<number> {
        return this.http.delete<number>(`${EvolutionService.URL}/${evolutionId}`);
    }

}
