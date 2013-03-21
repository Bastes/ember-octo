App.Router.map(function () {
  this.resource('posts', function () {
    this.resource('post', { path: ':post_id' });
    this.route('edit', { path: ':post_id/edit' });
    this.route('delete', { path: ':post_id/delete' });
    this.route('new', { path: 'new' });
  });
  this.resource('categories', function () {
  	this.resource('category', { path: ':category_id' });
  });
});
