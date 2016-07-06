import Project from './project.js';

describe('Unit: New Project', function() {

  let project;

  beforeEach(function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'BuIlD',
      name: 'Mr. Eldred Becker',
      owner: 'Gust_Jaskolski62',
      time: '2016-07-05T12:19:33.356Z',
      state: 'FaIL',
      metrics: {
        test: 35,
        maintainability: 18,
        security: 96,
        workmanship: 34
      },
      build: {
        debug: {},
        release: {},
        time: '2016-07-05T22:39:17.264Z'
      },
      unitTest: {
        passed: 319,
        fail: 42,
        coverage: 92
      },
      functionalTest: {
        passed: 26,
        fail: 8,
        coverage: 50
      }
    };
    project = new Project(json);
  });

  it('should exist!!!', function() {
    expect(project).toBeDefined();
    expect(project.id).toBeDefined();
    expect(project.type).toBeDefined();
    expect(project.name).toBeDefined();
    expect(project.owner).toBeDefined();
    expect(project.time).toBeDefined();
    expect(project.state).toBeDefined();
    expect(project.metrics).toBeDefined();
    expect(project.build).toBeDefined();
    expect(project.unitTest).toBeDefined();
    expect(project.functionalTest).toBeDefined();
    expect(project.isSelected).toBeDefined();
    expect(project.icon).toBeDefined();
  });

  it('should have type attribute', function() {
    expect(project.type).toEqual('build');
  });

  it('should have a toString method', function() {
    expect(project.toString()).toEqual('Mr. Eldred Becker');
  });

  it('should have a isSelected in false', function() {
    expect(project.isSelected).toBe(false);
  });

  // expect(foo).toThrowError("foo bar baz");

  // firewall: ['accepted', 'rejected'],
  // build: ['complete', 'fail']

});


describe('Unit: exception', function() {

  // let project;

  beforeEach(function() {
    // let json = {
    //   id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
    //   type: 'invalid'
    // };
    // project = new Project(json);
  });

  it('should exist!!!', function() {
    // let json = {
    //   id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
    //   type: 'invalid'
    // };
    // // project = new Project(json);
    // // throw new TypeError('type not defined')
    // // expect(new Project(json)).toThrowError('type not defined');
    // expect(new Project(json)).toThrowError(TypeError);
    // // expect(foo).toThrowError("foo bar baz");
  });

  // expect(foo).toThrowError("foo bar baz");
});
