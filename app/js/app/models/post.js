(function () {
  var App = window.App;

  App.Post = DS.Model.extend({
    title:      DS.attr('string'),
    body:       DS.attr('string'),
    createdAt:  DS.attr('date'),

    comments:   DS.hasMany('App.Comment'),
    categories: DS.hasMany('App.Category')
  });
})();
