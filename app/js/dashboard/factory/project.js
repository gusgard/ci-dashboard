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
