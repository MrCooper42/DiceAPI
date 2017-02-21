import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceService } from './dice.service';
import { DiceComponent } from './dice.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgbModule,
    CommonModule
  ],
  declarations: [
    DiceComponent
  ],
  providers: [
    DiceService
  ]
})
export class DiceModule { }
