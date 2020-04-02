import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {noop} from 'rxjs';

@Component({
  selector: 'app-snake-settings',
  templateUrl: './snake-settings.component.html',
  styleUrls: ['./snake-settings.component.scss']
})
export class SnakeSettingsComponent implements OnInit {

  private static readonly POSITIVE_INT_PATTERN: RegExp = new RegExp('^[1-9][0-9]*$');

  snakeSettingsForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  get width(): AbstractControl {
    return this.snakeSettingsForm.get('board.width');
  }

  get height(): AbstractControl {
    return this.snakeSettingsForm.get('board.height');
  }

  get speed(): AbstractControl {
    return this.snakeSettingsForm.get('snake.speed');
  }

  get energy(): AbstractControl {
    return this.snakeSettingsForm.get('snake.energy');
  }

  ngOnInit(): void {
    this.snakeSettingsForm = this.formBuilder.group({
      board: this.formBuilder.group({
        width: [10, [Validators.required, Validators.pattern(SnakeSettingsComponent.POSITIVE_INT_PATTERN)]],
        height: [8, [Validators.required, Validators.pattern(SnakeSettingsComponent.POSITIVE_INT_PATTERN)]]
      }),
      snake: this.formBuilder.group({
        speed: [2, [Validators.required, Validators.pattern(SnakeSettingsComponent.POSITIVE_INT_PATTERN)]],
        energy: [40, [Validators.required, Validators.pattern(SnakeSettingsComponent.POSITIVE_INT_PATTERN)]]
      })
    });
  }

  play(): void {
    this.router.navigateByUrl(`/game/play?width=${this.width.value}&height=${this.height.value}&speed=${this.speed.value}&energy=${this.energy.value}`).then(noop);
  }

}
