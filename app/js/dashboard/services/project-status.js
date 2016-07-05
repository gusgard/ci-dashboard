

class ProjectStore {
  constructor ($http, Project) {
    this.$http = $http;
    this.Project = Project;
    // this.init();
  }

  // init () {
  //   this.download();
  // }

  get projects () {
    return this._projects;
  }

  set projects (newProjects) {
    this._projects = newProjects;
  }

  download () {
    let {$http} = this;
    let {Project} = this;
    let projects = [];
    let successCallback = (response) => {
      if (response && response.data) {
        response.data.forEach(p => projects.push(new Project(p)));
        this.projects = projects;
      }
      // console.log(projects);
    };
    let errorCallback = (error) => {
      console.log(error);
    };
    return $http.get('http://localhost:3000/projects').then(successCallback, errorCallback);
  }

}
ProjectStore.$inject = ['$http', 'Project'];

export default ProjectStore;
