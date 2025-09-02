import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  AfterViewInit,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as d3 from 'd3';
import * as svgPanZoom from 'svg-pan-zoom';
import { FlowchartFacade } from '../../flowchart.facade';
import { Router } from '@angular/router';
import { DarkThemeService } from 'src/app/shared/services/dark-theme/dark-theme.service';

@Component({
  selector: 'app-flowgraph',
  templateUrl: './flowgraph.component.html',
  styleUrls: ['./flowgraph.component.scss'],
})
export class FlowgraphComponent implements AfterViewInit {
  @ViewChild('graph') graph!: ElementRef;
  @Input() graphSource!: SafeHtml;
  interval!: NodeJS.Timeout;

  constructor(
    private readonly facade: FlowchartFacade,
    private readonly router: Router,
    private readonly darkThemeService: DarkThemeService
  ) {
    this.interval = setInterval(() => {
      const svgElement = this.graph
        ? this.graph.nativeElement.querySelector('svg')
        : false;
      if (svgElement) {
        this.modifyGraph();
        this.renderSvgPanZoom(svgElement);
        clearInterval(this.interval);
      }
    }, 500);
  }

  ngAfterViewInit(): void {
    this.darkThemeService.turnGraphDarkMode();
  }

  isNotEmpty(): boolean {
    let graphSource = this.graphSource;
    return graphSource !== '' && JSON.stringify(graphSource) !== '{}';
  }

  renderSvgPanZoom(svgElement: SVGElement) {
    svgPanZoom(svgElement as SVGElement, {
      zoomEnabled: true,
      controlIconsEnabled: true,
      fit: true,
      minZoom: 0,
      center: true,
      dblClickZoomEnabled: false,
    });

    const controls = svgElement.querySelector(
      '#svg-pan-zoom-controls'
    ) as HTMLElement;
    controls.style.transform = 'translate(5px, 10px) scale(0.6)';
  }

  setMovimentacao(movimentacao: string) {
    this.facade.setQueryParams(movimentacao.trim());
    this.router.navigate(['/analysis']);
  }

  modifyGraph() {
    let graph = d3.select('.image-container').select('svg').select('.graph');
    let nodes = graph.selectAll('g.node');

    // Pegando posição dos nós
    let nodesContent = nodes.select('g').select('a').select('text');
    const clickButton = (text: string) => this.setMovimentacao(text);

    let positions: { x: number; y: number; text: string }[] = [];

    nodesContent.each(function (d, i) {
      let x: number = Number(d3.select(this).attr('x'));
      let y: number = Number(d3.select(this).attr('y'));
      let text: string = d3.select(this).text();

      positions.push({ x, y, text });
    });

    const infoSvg = graph.append('g').attr('class', 'info-button');

    infoSvg
      .selectAll('circle')
      .data(positions)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return d.x - 60;
      })
      .attr('cy', function (d) {
        return d.y + 5;
      })
      .attr('r', 10)
      .style('fill', '#015ebf')
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer')
      .on('click', (d, i) => clickButton(i.text));

    infoSvg
      .selectAll('text')
      .data(positions)
      .enter()
      .append('text')
      .text('i')
      .attr('x', function (d) {
        return d.x - 60;
      })
      .attr('y', function (d) {
        return d.y + 6;
      })
      .attr('fill', 'white')
      .attr('font-size', 16)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('cursor', 'pointer')
      .on('click', (d, i) => clickButton(i.text));
  }
}
