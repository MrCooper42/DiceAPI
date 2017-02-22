import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DiceService } from './dice.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  manualMode = false;
  diceRoll = 'TESTING!!!!';
  dieType;
  rollTotal;
  rollForm = {
    value: {
      roll: 'here'
    }
  }

  public dieForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public types = [
    { value: null, display: 'Choose Roll Type' },
    { value: null, display: 'Single die roll' },
    { value: null, display: 'Multiple die roll' },
    { value: null, display: 'Drop lows roll' },
    { value: null, display: 'Keep highs roll' },
    { value: null, display: 'Explosive roll' },
    { value: null, display: 'Literal value' }
  ]

  constructor(
    private diceService: DiceService,
    private _fb: FormBuilder
  ) { }

  rollDice() {
    console.log('Clicked');
    const roll = this.rollForm.value.roll;
    this.diceService.getTotal()
      .subscribe(
      data => {
        console.log(data, 'data returned');
        this.rollTotal = data;
      },
      error => console.error(error));
    // this.rollForm.reset();
  }

  setRoll() {
    let vals = this.dieForm.value;
    this.diceRoll = this.dieForm.value;
    console.log(this.diceRoll, 'roll')
  }

  chooseType(value) {
    console.log(value,'value')
    this.dieType = value.display;
  }

  showManual() {
    this.manualMode = !this.manualMode;
  }

  ngOnInit() {
    this.dieType = this.types[0].display;
    this.dieForm = new FormGroup({
      dieNum: new FormControl(null),
      dieSides: new FormControl(null),
      extraType: new FormControl(null),
      litNum: new FormControl(null),
      manual: new FormControl(null)
    });
  }

}
