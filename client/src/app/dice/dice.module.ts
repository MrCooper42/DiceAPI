import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DiceService } from './dice.service';
import { DiceComponent } from './dice.component';
// import { DiceChartsComponent } from '../dice-charts/dice-charts.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DiceComponent,
    // DiceChartsComponent
  ],
  providers: [
    DiceService
  ]
})
export class DiceModule { }
