import angular from 'angular';
import ViewOneController from './controllers/controller.js';
import CountStore from './services/count-store.js';
import TitleExample from './directives/title-example.js';

angular
  .module('myApp.view-one', [])
  .controller('ViewOneController', ViewOneController)
  .service('CountStore', CountStore)
  .directive('titleExample', TitleExample.directiveFactory);
