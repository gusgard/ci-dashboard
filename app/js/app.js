import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import configRouter from './config.js';
import './dashboard/module.js';

let dependencies = [
  'ui.router',
  'ngMaterial',
  'myApp.dashboard'
];

angular
  .module('myApp', dependencies)
  .config(configRouter);
