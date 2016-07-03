class ViewOneController {
  static get $inject () {
    return ['CountStore'];
  }

  constructor (CountStore) {
    this.CountStore = CountStore;
    this.init();
  }

  init () {
    this.name = 'ONE';
    this.CountStore.increment();
  }
}

export default ViewOneController;
