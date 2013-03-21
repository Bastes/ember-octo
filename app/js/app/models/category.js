App.Category = DS.Model.extend({
  title:      DS.attr('string'),
  posts: DS.hasMany('App.Post')
});
