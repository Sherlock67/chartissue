import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-new-bar-component',
  templateUrl: './new-bar-component.component.html',
  styleUrls: ['./new-bar-component.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewBarComponentComponent implements OnInit,OnChanges {
  @ViewChild('chart', {static: true})
  public chartContainer!: ElementRef;
  @Input()
  public data: Array<any> = [];
  private margin: any = { top: 5, bottom: 5, left: 5, right: 5};
  private chart: any;
  public width!: number;
  public height!: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private d : any
  constructor() { }

  ngOnInit(): void {
    this.createBarChart();
    if (this.data) {
      this.updateChart();
    }
  }
  ngOnChanges() {
    if (this.chart) {
      //this.updateChart();
    }
  }
  createBarChart(){
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
    .attr('width', element.offsetWidth)
    .attr('height', element.offsetHeight);
    this.chart = svg.append('g')
    .attr('class', 'bars')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    const xDomain = this.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.data, d => d[1])];
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red','black']);
    this.xAxis = svg.append('g')
       .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
       .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
       .attr('class', 'axis axis-y')
       .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
       .call(d3.axisLeft(this.yScale));

  }

  updateChart() {

    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', (d: any[]) => this.xScale(d[0]))
      .attr('y', (d: any[]) => this.yScale(d[1]))
      .attr('width', (d: any) => this.xScale.bandwidth())
      .attr('height', (d: any[]) => this.height - this.yScale(d[1]))
      .style('fill', (d: any, i: any) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any[]) => this.xScale(d[0]))
      .attr('y', (d: any) => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d: any, i: any) => this.colors(i))
      .transition()
      .delay((d: any, i: number) => i * 10)
      .attr('y', (d: any[]) => this.yScale(d[1]))
      .attr('height', (d: any[]) => this.height - this.yScale(d[1]));
  }
}
