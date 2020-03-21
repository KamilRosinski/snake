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

  snakeSettingsForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly router: Router) {
  }

  private get width(): AbstractControl {
    return this.snakeSettingsForm.get('board.width');
  }

  private get height(): AbstractControl {
    return this.snakeSettingsForm.get('board.height');
  }

  private get speed(): AbstractControl {
    return this.snakeSettingsForm.get('snake.speed');
  }

  private get energy(): AbstractControl {
    return this.snakeSettingsForm.get('snake.energy');
  }

  ngOnInit(): void {
    this.snakeSettingsForm = this.formBuilder.group({
      board: this.formBuilder.group({
        width: [10, Validators.required],
        height: [8, Validators.required]
      }),
      snake: this.formBuilder.group({
        speed: [3, Validators.required],
        energy: [40, Validators.required]
      })
    });
  }

  play(): void {
    this.router.navigateByUrl(`/snake/game?width=${this.width.value}&height=${this.height.value}&speed=${this.speed.value}&energy=${this.energy.value}`).then(noop);
  }

}
