class DashboardController {
  static get $inject () {
    return ['ProjectStore'];
  }

  constructor (ProjectStore) {
    this.ProjectStore = ProjectStore;
    this.init();
  }

  init () {
    let {ProjectStore} = this;
    ProjectStore.download().then(() => {
      this.projects = ProjectStore.projects;
      [this.selected] = this.projects;
    });
    this.actions = {
      accepted: {
        change: 'Change Accepted',
        description: 'Auto-Merged',
        icon: 'call_merge',
        button: 'Merged build'
      },
      rejected: {
        change: 'Change Rejected',
        description: 'Metrics Reduction',
        icon: 'search',
        button: 'Find issues'
      },
      complete: {
        change: '',
        description: 'Completed',
        icon: 'flight',
        button: 'Deploy'
      },
      fail: {
        change: 'Change fail',
        description: 'Fail',
        icon: 'error',
        button: 'Fail'
      }
    };
  }

  expand (project) {
    if (this.selected.id === project.id) {
      this.selected.isSelected = !this.selected.isSelected;
    } else {
      this.selected.isSelected = false;
      project.isSelected = true;
      this.selected = project;
    }
  }
}

export default DashboardController;
