import { Component, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DiceService } from './dice.service';
import { DieModel } from './dieModel';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  manualMode = false;
  dieTypeDisplay;
  currentInput = '';
  allInputs = [];
  dieType = '';
  rollTotal;
  finalTotal;
  currExtra = '';
  dieModel = new DieModel('3', 'd', '6', '', '', '', '');
  diceRoll = this.dieModel.dieNum + this.dieModel.dieD + this.dieModel.dieSides;
  public dieForm: FormGroup;
  // public submitted: boolean;
  // public events: any[] = [];
  public types = [{ value: '', display: 'Choose Roll Type' },
  { value: '', display: 'Single die roll' },
  { value: '', display: 'Multiple die roll' },
  { value: 'd', display: 'Drop lows roll' },
  { value: 'k', display: 'Keep highs roll' },
  { value: 'x', display: 'Explosive roll' },
  { value: '', display: 'Literal value' }
  ];

  constructor(
    private diceService: DiceService,
    private _fb: FormBuilder
  ) { }

  setRoll() {
    const formData = this.dieForm.value;
    let input;
    let final;
    if (formData.manual.length > 0) {
      input = formData.manual;
      this.dieForm.reset();
      formData.submitRoll = input;
    } else {
      input = formData.dieNum + formData.dieD + formData.dieSides + this.dieType + formData.extraNum;
    }
    this.allInputs.push(input);
    if (this.allInputs.length > 1) {
      final = this.allInputs.join('');
    } else {
      final = this.allInputs[0];
    }
    formData.submitRoll = final;
    console.log(this.diceRoll, 'roll');
    return this.rollDice(formData);
  }

  chooseType(value) {
    switch (value.display) {
      case 'Literal value':
        this.dieModel = new DieModel('', '', '', '', '2', '', '');
        break;
      case 'Single die roll':
        this.dieModel = new DieModel('', 'd', '6', '', '', '', '');
        break;
      case 'Multiple die roll':
        this.dieModel = new DieModel('2', 'd', '6', '', '', '', '');
        break;
      case 'Drop lows roll':
        this.dieModel = new DieModel('6', 'd', '6', 'd', '2', '', '');
        this.currExtra = this.dieModel.extraNum;
        break;
      case 'Keep highs roll':
        this.dieModel = new DieModel('5', 'd', '6', 'k', '2', '', '');
        this.currExtra = this.dieModel.extraNum;
        break;
      case 'Explosive roll':
        this.dieModel = new DieModel('4', 'd', '6', 'x', '5', '', '');
        this.currExtra = this.dieModel.extraNum;
        break;
    }
    this.changeForm();
    this.dieTypeDisplay = value.display;
    this.dieType = value.value;
  }

  showManual() {
    if (this.manualMode) {
      this.changeForm();
    } else {
      this.dieForm.reset();
    }
    this.manualMode = !this.manualMode;
  }

  rollDice(formData) {
    this.diceService.getTotal(formData)
      .subscribe(
      data => {
        console.log(data, 'roll returned');
        this.rollTotal = data;
      },
      error => console.error(error));
      this.getStats(formData);
      this.allInputs = [];
      this.changeForm();

  }

  getStats(formData) {
    this.diceService.getProbability(formData)
      .subscribe(
      data => {
        console.log(data, 'stats returned');
        this.rollTotal = data;
      },
      error => console.error(error));
      this.allInputs = [];
      this.changeForm();
  }

  changeForm() {
    this.dieForm = new FormGroup({
      dieNum: new FormControl(this.dieModel.dieNum),
      dieD: new FormControl(this.dieModel.dieD),
      dieSides: new FormControl(this.dieModel.dieSides),
      extraNum: new FormControl(this.dieModel.extraNum),
      litNum: new FormControl(this.dieModel.litNum),
      manual: new FormControl(this.dieModel.manual),
      submitRoll: new FormControl(null)
    });
  }

  ngOnInit() {
    this.dieTypeDisplay = this.types[0].display;
    this.changeForm();
  }

}
