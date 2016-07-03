class ViewTwoController {
  constructor (CountStore) {
    this.CountStore = CountStore;
    this.init();
  }

  init () {
    this.name = 'TWO';
    this.CountStore.increment();
  }
}

ViewTwoController.$inject = ['CountStore'];

export default ViewTwoController;
