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
    });
  }
}

export default DashboardController;
