App.PostsNewRoute = Ember.Route.extend({
  model: function () {
    return App.Post.createRecord({ createdAt: new Date() });
  }
});
