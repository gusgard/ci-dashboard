import D3PieChart from '../../d3/pie-chart.js';

class PieChart {
  constructor () {
    this.restrict = 'E';
    this.templateNamespace = 'svg';
    this.scope = {
      data: '=',
      width: '@',
      height: '@',
      duration: '@'
    };
  }

  link (scope, element) {
    scope.$watch('data', data => {
      if (typeof data === 'undefined') return;

      // Delete the previous chart (if any).
      element[0].innerHTML = '';
      let chart = new D3PieChart({
        root: element[0],
        width: scope.width,
        height: scope.height,
        data: data,
        duration: scope.duration
      });

      // Render it.
      chart.render();
    });
  }

  // Based on: http://www.sitepoint.com/writing-angularjs-apps-using-es6/
  static directiveFactory () {
    PieChart.instance = new PieChart();
    return PieChart.instance;
  }
}

PieChart.directiveFactory.$inject = [];

export default PieChart;