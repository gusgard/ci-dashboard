import angular from 'angular';
import ViewOneController from './controllers/controller.js';
// import TitleExample from './directives/title-example.js';
import ProjectStore from './services/project-status.js';
import Project from './factory/project.js';

angular
  .module('myApp.dashboard', [])
  .controller('DashboardController', ViewOneController)
  .service('ProjectStore', ProjectStore)
  .factory('Project', () => Project);
// .directive('titleExample', TitleExample.directiveFactory);
