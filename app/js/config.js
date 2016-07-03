let configRouter = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'templates/dashboard/dashboard.html',
      controller: 'DashboardController as DashboardCtrl'
    });

  $urlRouterProvider.otherwise('dashboard');
};

configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

export default configRouter;
