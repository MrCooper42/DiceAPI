import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

//

@Component({
  selector: 'app-dice-charts',
  templateUrl: './dice-charts.component.html',
  styleUrls: ['./dice-charts.component.css']
})
export class DiceChartsComponent implements OnInit {
@Input()
// chartState: any;
height;
host;
htmlElement: HTMLElement;
margin;
svg;
width;
xAxis;
xScale;
yAxis;
yScale;
zScale;


  constructor(private _element: ElementRef) {
    this.host = D3.select(this._element.nativeElement)
   }

  ngOnChanges() {
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('#chartplot').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.zScale = D3.scaleLinear().range([2, 15]);
  }

  buildSVG() {
  this.host.html('');
  this.svg = this.host.append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale)
      .ticks(5)
      .tickPadding(15);
    this.svg.append('g')
      .attr('class', 'label')
      .attr('x', this.width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .style('fill', 'grey')
      .text('Roll Chance')
}

  ngOnInit() {
  }

}
