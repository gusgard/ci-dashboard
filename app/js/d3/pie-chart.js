import d3 from 'd3';

/**
 * Pie Chart.
 *
 * Displays an pie chart depending of the values passed.
 *
 * This chart constructor expects an options object with the following
 * structure:
 *
 * @param {object}      opts:       An object with the chart options.
 * @param {number}      opts.width: The width of the canvas, not the chart.
 * @param {number}      ops.height: The height of the canvas, not the chart.
 * @param {HTMLElement} opts.root:  The container's DOM element.
 * @param {object}      opts.risk:   The risk objects.
 */
class PieChart {
  constructor (opts) {
    this.root = opts.root;
    this.selection = d3.select(this.root);
    this.data = opts.data;
    this.duration = opts.duration || 1000;

    this.width = opts.width || 300;
    this.height = opts.height || 300;

    this.radius = Math.min(this.width, this.height) / 2;

    this.data = [
      { label: 'TR', value: 1 },
      { label: 'BE', value: 2 }
    ];
    this.container = this.selection
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
        .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    let pie = d3.layout.pie()
        // .sort(null)
        .value(d => d.value);

    this.g = this.container.selectAll('.arc')
        .data(pie(this.data))
      .enter()
        .append('g')
        .attr('class', 'arc');
  }

  /**
   * Render the chart inside of the root element.
   */
  render () {
    this.renderArcs()
        .renderText();
  }

  /**
   * Render the background circles as well as the title.
   */
  renderArcs () {
    let color = d3.scale.ordinal().range(['#98abc5', '#8a89a6', '#7b6888']);

    let arc = d3.svg.arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    // function tweenPie (finish) {
    //   finish.innerRadius = 0;
    //   var start = {
    //     startAngle: 0,
    //     endAngle: 0
    //   };
    //   var i = d3.interpolate(start, finish);
    //   return function (d) { return arc(i(d)); };
    // }

    this.g
        .append('path')
        .attr('d', arc)
        .style('fill', d => color(d.data.label))
        .transition()
        // .ease('bounce')
        // .duration(this.duration)
        // .attrTween('d', tweenPie);

    return this;
  }
  // http://jsfiddle.net/thmain/xL48ru9k/1/
  /**
   * Render the arc and the value in the top of the chart.
   */
  renderText () {
    let labelArc = d3.svg.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);

    this.g.append('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('dy', '.35em')
        .text(d => d.data.label);

    return this;
  }
}

export default PieChart;
