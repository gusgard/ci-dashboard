import angular from 'angular';
import 'angular-ui-router';
import 'angular-material';
import configRouter from './config.js';
import './dashboard/module.js';

let dependencies = [
  'ui.router',
  'ngMaterial',
  'ciApp.dashboard'
];

angular
  .module('ciApp', dependencies)
  .config(configRouter);
