var faker = require('faker');

var constrains = {
  firewall: ['accepted', 'rejected'],
  build: ['complete', 'fail']
};

var types = ['firewall', 'build'];

var generateProject = function () {
  return new Promise(function (resolve) {
    var project = {};

    project.id = faker.random.uuid();
    project.type = faker.random.arrayElement(types);
    project.name = faker.name.findName();
    project.owner = faker.internet.userName();
    project.time = faker.date.recent();
    project.state = faker.random.arrayElement(constrains[project.type]);
    project.metrics = {
      test: faker.random.number({max: 100}),
      maintainability: faker.random.number({max: 100}),
      security: faker.random.number({max: 100}),
      workmanship: faker.random.number({max: 100})
    };
    project.build = {
      debug: {},
      release: {},
      time: faker.date.recent()
    };
    project.unitTest = {
      passed: faker.random.number({max: 500}),
      fail: faker.random.number({max: 250}),
      coverage: faker.random.number({max: 100})
    };
    project.functionalTest = {
      passed: faker.random.number({max: 400}),
      fail: faker.random.number({max: 200}),
      coverage: faker.random.number({max: 100})
    };
    resolve(project);
  });
};

module.exports = function (max) {
  var projects = [];
  for (var i = 0; i < max; i++) {
    projects.push(generateProject());
  }
  return Promise.all(projects).then(function (projects) {
    return projects;
  });
};
