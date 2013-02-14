(function () {
  window.App.Router.map(function () {
    this.resource('posts', function () {
      this.route('new');
      this.route('show', {path: '/:post_id'});
      this.route('edit', {path: '/:post_id/edit'});
    });
  });
})();
