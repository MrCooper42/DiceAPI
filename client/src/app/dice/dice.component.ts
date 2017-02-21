import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { DiceService } from './dice.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  diceRoll =  'TESTING!!!!';
  dieType;
  rollTotal;
  rollForm = {
    value: {
      roll: "here"
    }
  }


  public types = [
    { value: null, display: 'Choose Roll Type'},
    { value: null, display: 'Single die roll'},
    { value: null, display: 'Multiple die roll'},
    { value: null, display: 'Drop lows roll'},
    { value: null, display: 'Keep highs roll'},
    { value: null, display: 'Literal value'}
  ]

  constructor(
    private diceService: DiceService
  ) { }

  rollDice() {
    let roll = this.rollForm.value.roll;
    this.diceService.getTotal(roll)
    .subscribe (
      data => {
        console.log(data, 'data returned');
        this.rollTotal = data;
      },
      error => console.error(error));
      // this.rollForm.reset();
  }

  chooseType(value) {
    this.dieType = value;
  }

  ngOnInit() {
  this.dieType = this.types[0].display;
}

}
