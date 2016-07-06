import angular from 'angular';
import DashboardController from './controllers/controller.js';
import PieChart from './directives/pie-chart.js';
import ProjectStore from './services/project-status.js';
import Project from './factory/project.js';
import CoverageBar from './directives/coverage-bar.js';
import StatusBar from './directives/status-bar.js';

angular
  .module('ciApp.dashboard', [])
  .controller('DashboardController', DashboardController)
  .service('ProjectStore', ProjectStore)
  .factory('Project', () => Project)
  .directive('pieChart', PieChart.directiveFactory)
  .component('coverageBar', CoverageBar)
  .component('statusBar', StatusBar);
