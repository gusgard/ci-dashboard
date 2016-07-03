import angular from 'angular';
import ViewOneController from './controllers/controller.js';
import CountStore from './services/count-store.js';
import TitleExample from './directives/title-example.js';

angular
  .module('myApp.dashboard', [])
  .controller('DashboardController', ViewOneController)
  .service('CountStore', CountStore)
  .directive('titleExample', TitleExample.directiveFactory);
