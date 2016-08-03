let ProgressCard = {
  bindings: {
    title: '@',
    subtitle: '@',
    data: '=',
    percentage: '@',
    description: '@',
    coverageTitle: '@',
    coverageSubtitle: '@'
  },
  controllerAs: 'ProgressCardCtrl',
  templateUrl: 'templates/dashboard/components/progress-card.html'
};

export default ProgressCard;
