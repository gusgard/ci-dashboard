class TitleExample {
  constructor () {
    this.restrict = 'E';
    this.templateUrl = 'templates/dashboard/directives/title-example.html';
    this.scope = {
      title: '@',
      message: '@clickMessage'
    };
  }

  link (scope, element) {
    element.on('click', () => {
      window.alert('Element clicked: ' + scope.message);
    });
  }

  // Based on: http://www.sitepoint.com/writing-angularjs-apps-using-es6/
  static directiveFactory () {
    TitleExample.instance = new TitleExample();
    return TitleExample.instance;
  }
}

TitleExample.directiveFactory.$inject = [];

export default TitleExample;
