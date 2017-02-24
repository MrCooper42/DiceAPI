import { visitAll } from '@angular/compiler/src/ml_parser/ast';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import * as D3 from 'd3/index';

import { DiceService } from './dice.service';
import { DieModel } from './dieModel';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  private chartData: Array<any>;
  private types = [{ value: '', display: 'Choose Roll Type' },
  { value: '', display: 'Single die roll' },
  { value: '', display: 'Multiple die roll' },
  { value: 'd', display: 'Drop lows roll' },
  { value: 'k', display: 'Keep highs roll' },
  { value: 'x', display: 'Explosive roll' },
  { value: '', display: 'Literal value' }
  ];

  public dieForm: FormGroup;

  manualMode = false;
  dieTypeDisplay;
  lastInput = '';
  allInputs = [];
  dieType = '';
  currExtra = '';
  rollStats;
  rollTotal;
  rollChance;
  lowRoll;
  highRoll;
  // errorMessage: string; TODO:
  dieModel = new DieModel('3', 'd', '6', '', '', '', '');

  constructor(private diceService: DiceService, private _fb: FormBuilder) { }

  setRoll() {
    const formData = this.dieForm.value;
    let input;
    let final;
    if (formData.manual.length > 0) {
      input = formData.manual;
      // this.dieForm.reset();
      formData.submitRoll = input;
    } else {
      input = formData.dieNum + formData.dieD + formData.dieSides + this.dieType + formData.extraNum + formData.litNum;
    }
    this.allInputs.push(input);
    if (this.allInputs.length > 1) {
      final = this.allInputs.join('');
    } else {
      final = this.allInputs[0];
    }
    formData.submitRoll = final;
    return this.rollDice(formData);
  }

  chooseType(value) {
    switch (value.display) {
      case 'Literal value':
        this.dieModel = new DieModel('', '', '', '', '', '2', '');
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
    }
    this.manualMode = !this.manualMode;
  }

  changeForm() {
    const isIntegerRegex = /^\d+$/;
    this.dieForm = this._fb.group({
      dieNum: new FormControl(this.dieModel.dieNum, Validators.pattern(isIntegerRegex)),
      dieD: new FormControl(this.dieModel.dieD),
      dieSides: new FormControl(this.dieModel.dieSides, Validators.pattern(isIntegerRegex)),
      extraNum: new FormControl(this.dieModel.extraNum, Validators.pattern(isIntegerRegex)),
      litNum: new FormControl(this.dieModel.litNum, Validators.pattern(isIntegerRegex)),
      manual: new FormControl(this.dieModel.manual),
      submitRoll: new FormControl(null)
    });
    console.log(this.dieForm, "form")
  }

// connecting to service
  rollDice(formData) {
    this.diceService.getTotal(formData)
      .subscribe(
      data => {
        console.log(data.answer, 'roll returned');
        this.rollTotal = data.answer;
        this.lastInput = ' in ' + formData.submitRoll;
        this.getStats(formData);
      },
      error => {
        console.error(error);
        this.lastInput = '';
        this.rollChance = '0';
        this.rollTotal = `is none... Please check your input`;
      });
    this.allInputs = [];
  }

  getStats(formData) {
    this.diceService.getProbability(formData)
      .subscribe(
      data => {
        const keys = Object.keys(data);
        this.lowRoll = `Lowest value: ${keys[0]}`;
        this.highRoll = `Highest value: ${keys[keys.length - 1]}`;
        for (const roll in data) {
          if (`${this.rollTotal}` === `${roll}`) {
            this.rollChance = (data[roll] / 100);
          }
        }
        this.rollStats = data;
      },
      error => console.error(error));
      this.allInputs = [];
      // this.changeForm();
  }

  ngOnInit() {
    this.rollTotal = '';
    this.dieTypeDisplay = this.types[0].display;
    this.changeForm();
    this.chartData = [1, 2, 3, 4, 5, 6, 7];
  }

}
