App.PostsNewRoute = Ember.Route.extend({
  model: function () {
    return App.Post.createRecord({ createdAt: new Date() });
  },
  setupController: function (controller, model) {
    this._super()
    controller.set('content', model);
  }
});
