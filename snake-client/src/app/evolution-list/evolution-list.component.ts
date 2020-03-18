import {Component, OnInit} from '@angular/core';
import {EvolutionService} from '../services/evolution.service';
import {Evolution} from '../shared/evolution';

@Component({
    selector: 'app-evolution-list',
    templateUrl: './evolution-list.component.html',
    styleUrls: ['./evolution-list.component.scss']
})
export class EvolutionListComponent implements OnInit {

    evolutions: Evolution[] = [];

    constructor(private readonly evolutionService: EvolutionService) {
    }

    ngOnInit(): void {
        this.evolutionService.getAllEvolutions()
            .subscribe((evolutions: Evolution[]) => this.evolutions = evolutions);
    }

    delete(evolutionId: number): void {
        this.evolutionService.deleteEvolution(evolutionId)
            .subscribe((evolution: Evolution) => this.evolutions = this.evolutions
                .filter((e: Evolution) => e.id !== evolution.id));
    }

    create(): void {
        this.evolutionService.createEvolution()
            .subscribe((evolution: Evolution) => this.evolutions.push(evolution));
    }

}
