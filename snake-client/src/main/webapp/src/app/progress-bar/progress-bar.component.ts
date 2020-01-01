import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

    private static readonly LOW_VALUE_THRESHOLD: number = 0.25;

    @Input() value: number;

    get barClass(): string {
        return this.value <= ProgressBarComponent.LOW_VALUE_THRESHOLD
            ? 'warning'
            : 'info';
    }

}
