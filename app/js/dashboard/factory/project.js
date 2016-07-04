const constrains = {
  firewall: ['accepted', 'rejected'],
  build: ['complete', 'fail']
};

class Project {
  constructor (initial) {
    this.setType(initial);
    this.name = initial.name || 'Name not defined';
    this.owner = initial.owner || 'Owner not defined';
    this.time = new Date(initial.time);
    this.setState(initial);
    this.setMetrics(initial);
    this.setBuild(initial);
    this.setUnitTest(initial);
    this.setFunctionalTest(initial);
  }

  setType ({type}) {
    if (!type) {
      this.hasErrors = true;
    }
    type = type.toLowerCase();
    if (type in constrains) {
      this.type = type;
    } else {
      console.error('type not defined');
    }
  }

  setState({state}) {
    if (!state) {
      this.hasErrors = true;
    }
    state = state.toLowerCase();
    if (constrains[this.type].includes(state)) {
      this.state = state;
    } else {
      console.error('state not defined');
    }
  }

  setMetrics ({metrics}) {
    this.metrics = {
      test: metrics.test,
      maintainability: metrics.maintainability,
      security: metrics.security,
      workmanship: metrics.workmanship
    };
  }

  setBuild ({build}) {
    this.build = {
      debug: build.debug,
      release: build.release,
      time: new Date(build.time)
    };
  }

  setUnitTest ({unitTest}) {
    this.unitTest = {
      passed: unitTest.passed,
      fail: unitTest.fail,
      coverage: unitTest.coverage
    };
  }

  setFunctionalTest ({functionalTest}) {
    this.functionalTest = {
      passed: functionalTest.passed,
      fail: functionalTest.fail,
      coverage: functionalTest.coverage
    };
  }

  toString () {
    return this.name;
  }
}
Project.$inject = [];

export default Project;
