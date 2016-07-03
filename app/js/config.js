let configRouter = function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('view-one', {
      url: '/view-one',
      templateUrl: 'templates/view-one/view-one.html',
      controller: 'ViewOneController as ViewOneCtrl'
    })
    .state('view-two', {
      url: '/view-two',
      templateUrl: 'templates/view-two/view-two.html',
      controller: 'ViewTwoController as ViewTwoCtrl'
    });
  $urlRouterProvider.otherwise('view-one');
};

configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

export default configRouter;
