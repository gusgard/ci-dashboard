import angular from 'angular';
import CoverageBar from './directives/coverage-bar.js';
import DashboardController from './controllers/controller.js';
import PieChart from './directives/pie-chart.js';
import Project from './factory/project.js';
import ProjectStore from './services/project-status.js';
import StatusBar from './directives/status-bar.js';
import MetricsCard from './components/metrics-card.js';
import BuildCard from './components/build-card.js';
import ProgressCard from './components/progress-card.js';
import ResultCard from './components/result-card.js';

angular
  .module('ciApp.dashboard', [])
  .controller('DashboardController', DashboardController)
  .service('ProjectStore', ProjectStore)
  .factory('Project', () => Project)
  .directive('pieChart', () => new PieChart())
  .component('coverageBar', CoverageBar)
  .component('statusBar', StatusBar)
  .component('metricsCard', MetricsCard)
  .component('buildCard', BuildCard)
  .component('progressCard', ProgressCard)
  .component('resultCard', ResultCard);
