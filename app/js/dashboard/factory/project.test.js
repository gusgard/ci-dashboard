import Project from './project.js';

describe('Create New Project', function() {

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

  it('should exist data', function() {
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

  it('should have a type attribute', function() {
    expect(project.type).toEqual('build');
  });

  it('should have a toString method', function() {
    expect(project.toString()).toEqual('Mr. Eldred Becker');
  });

  it('should have a isSelected in false', function() {
    expect(project.isSelected).toBe(false);
  });
});

describe('Throw exceptions', function() {

  beforeEach(function() {
  });

  it('type should not be defined', function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'invalid'
    };
    expect(() => new Project(json)).toThrowError(TypeError, 'type not defined');
  });

  it('"state" should not be defined for type firewall', function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'firewall',
      state: 'complete'
    };
    expect(() => new Project(json)).toThrowError(TypeError, 'state not defined');
  });

  it('"fail" should not be defined for type firewall', function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'firewall',
      state: 'fail'
    };
    expect(() => new Project(json)).toThrowError(TypeError, 'state not defined');
  });

  it('"accepted" should not be defined for type build', function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'build',
      state: 'accepted'
    };
    expect(() => new Project(json)).toThrowError(TypeError, 'state not defined');
  });

  it('"rejected" should not be defined for type build', function() {
    let json = {
      id: '28d7eb92-0d96-48ba-89d8-3a9d7048b67a',
      type: 'build',
      state: 'rejected'
    };
    expect(() => new Project(json)).toThrowError(TypeError, 'state not defined');
  });
});
