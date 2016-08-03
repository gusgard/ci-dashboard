import CoverageBar from './directives/coverage-bar.js';
import DashboardController from './controllers/controller.js';
import PieChart from './directives/pie-chart.js';
import Project from './factory/project.js';
import ProjectStore from './services/project-status.js';
import StatusBar from './directives/status-bar.js';

describe('Classes', () => {
  it('should be defined', () => {
    expect(CoverageBar).toBeDefined();
    expect(DashboardController).toBeDefined();
    expect(PieChart).toBeDefined();
    expect(Project).toBeDefined();
    expect(ProjectStore).toBeDefined();
    expect(Project).toBeDefined();
    expect(StatusBar).toBeDefined();
  });
});
