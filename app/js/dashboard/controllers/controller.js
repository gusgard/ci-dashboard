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
      console.log(this.projects);
      [this.selected] = this.projects;
    });
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
