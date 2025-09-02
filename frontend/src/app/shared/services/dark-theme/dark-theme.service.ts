import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class DarkThemeService {
  constructor() {}

  public darkMode() {
    if (localStorage.getItem('dark-theme') === 'true')
      localStorage.setItem('dark-theme', 'false');
    else localStorage.setItem('dark-theme', 'true');
    document.body.classList.toggle('dark-theme');
  }

  public svgColorChange(color: string) {
    let graph = d3.select('.image-container').select('svg').select('.graph');
    let nodes = graph.selectAll('g.node');
    nodes.select('g').select('a').select('path').attr('stroke', color);
    let edges = graph.selectAll('g.edge');

    let edgesContent = edges.select('g').select('a');
    edgesContent.select('path').attr('stroke', color);
    edgesContent.select('polygon').attr('fill', color);
    edgesContent.select('polygon').attr('stroke', color);

    edges.selectAll('g').each(function (d, i) {
      if (i === 1) {
        d3.select(this).select('a').select('text').attr('fill', color);
      }
    });
  }

  public turnGraphDarkMode() {
    if (
      !d3.select('.image-container').select('svg').empty() &&
      document.body.classList.contains('dark-theme')
    ) {
      this.svgColorChange('white');
    } else if (
      !d3.select('.image-container').select('svg').empty() &&
      !document.body.classList.contains('dark-theme')
    ) {
      this.svgColorChange('black');
    }
  }
}
