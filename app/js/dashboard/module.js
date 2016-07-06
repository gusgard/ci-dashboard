import angular from 'angular';
import DashboardController from './controllers/controller.js';
import PieChart from './directives/pie-chart.js';
import ProjectStore from './services/project-status.js';
import Project from './factory/project.js';

angular
  .module('ciApp.dashboard', [])
  .controller('DashboardController', DashboardController)
  .service('ProjectStore', ProjectStore)
  .factory('Project', () => Project)
  .directive('pieChart', PieChart.directiveFactory);
