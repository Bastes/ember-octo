App.CategoriesRoute = Ember.Route.extend({
  model: function () {
    return App.Category.find();
  }
});
