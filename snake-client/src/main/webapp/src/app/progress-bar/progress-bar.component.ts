import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {

    private _valuePercent: number;

    @Input() set value(value: number) {
        this._valuePercent = value * 100;
    }

    get valuePercent(): number {
        return this._valuePercent;
    }

}
