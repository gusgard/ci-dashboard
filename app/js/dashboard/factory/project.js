import moment from 'moment';

const constrains = {
  firewall: ['accepted', 'rejected'],
  build: ['complete', 'fail']
};

const icons = {
  firewall: 'dvr',
  build: 'line_style'
};

class Project {
  constructor (initial) {
    this.id = initial.id || 0;
    this.setType(initial);
    this.name = initial.name || 'Name not defined';
    this.owner = initial.owner || 'Owner not defined';
    this.time = moment(new Date(initial.time)).format('MM/DD/YYYY hh:mm A');
    this.setState(initial);
    this.setMetrics(initial);
    this.setBuild(initial);
    this.setUnitTest(initial);
    this.setFunctionalTest(initial);

    this.isSelected = false;
    this.icon = icons[this.type];
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
      throw new TypeError('type not defined');
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
      throw new TypeError('state not defined');
    }
  }

  setMetrics ({metrics}) {
    this.metrics = {
      test: metrics.test,
      maintainability: metrics.maintainability,
      security: metrics.security,
      workmanship: metrics.workmanship,
      error: metrics.error,
      success: metrics.success
    };
  }

  setBuild ({build}) {
    this.build = {
      debug: build.debug,
      release: build.release,
      time: moment(new Date(build.time)).format('hh:mm A - MM/DD/YYYY'),
      error: build.error,
      success: build.success
    };
  }

  setUnitTest ({unitTest}) {
    let passed = unitTest.passed;
    let fail = unitTest.fail;
    let percentage = passed / (passed + fail) * 100;
    this.unitTest = {
      passed: passed,
      fail: fail,
      coverage: unitTest.coverage,
      percentage: percentage.toFixed(1),
      error: unitTest.error,
      success: unitTest.success
    };
  }

  setFunctionalTest ({functionalTest}) {
    let passed = functionalTest.passed;
    let fail = functionalTest.fail;
    let percentage = passed / (passed + fail) * 100;
    this.functionalTest = {
      passed: passed,
      fail: fail,
      coverage: functionalTest.coverage,
      percentage: percentage.toFixed(1),
      error: functionalTest.error,
      success: functionalTest.success
    };
  }

  toString () {
    return this.name;
  }
}
Project.$inject = [];

export default Project;
