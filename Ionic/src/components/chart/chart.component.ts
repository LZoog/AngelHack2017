import { Component, OnInit, OnChanges, Input } from '@angular/core';

import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'chart',
  templateUrl: 'chart.component.html'
})
export class Chart implements OnInit, OnChanges {

  @Input() state;

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    setTimeout(() => {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    });
  }

  ngOnChanges() {
    setTimeout(() => {
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();
    });
  }

  private initSvg() {
    console.log(this.name);
    this.svg = d3Selection.select(`#${this.name}`)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.answers, (d: any) => {
      console.log('the d', d);
      return new Date(d.dateAnswered)
    } ));
    this.y.domain(d3Array.extent(this.answers, (d: any) => d.value ));
  }

  private drawAxis() {
    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(this.name);
  }

  private drawLine() {
    this.line = d3.line().curve(d3.curveBasis)
       .x( (d: any) => this.x(new Date(d.dateAnswered)) )
       .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
      .datum(this.answers)
      .attr("class", "line")
      .attr("d", this.line);
  }

  get name() {
    return this.state.name;
  }

  get answers() {
    return this.state.answers.sort((a, b) => <any>new Date(b.dateAnswered) - <any>new Date(a.dateAnswered));
  }

}
