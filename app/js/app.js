window.App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

// Models
//==============
App.Table = DS.Model.extend({
	name: DS.attr("string"),
	tab: DS.belongsTo('App.Tab')
});

App.Tab = DS.Model.extend({
	tabItems: DS.hasMany('App.TabItem'),
	total: function () {
		return this.get('tabItems').reduce(function (r, ti) {
			return r + ti.get('price');
		}, 0)
	}.property('tabItems.@each.price')
});

App.TabItem = DS.Model.extend({
	price: DS.attr('number'),
	food: DS.belongsTo('App.Food')
});

App.Food = DS.Model.extend({
	price: DS.attr('number'),
	name: DS.attr('string'),
	imagePath: DS.attr('string')
});

App.Router.map(function () {
	this.resource('tables', function () {
		this.resource('table', { path: ':table_id' })
	});
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('tables');
  }
});

App.TablesRoute = Ember.Route.extend({
    model: function () { 
    	return App.Table.find();
    }
});

App.TableRoute = Ember.Route.extend({
    model: function (params) {
    	return App.Table.find(params.table_id);
    }
});

App.Table.FIXTURES = [
  {id: 1, name: "Table 1", tab: 1},
  {id: 2, name: "Table 2", tab: 2},
  {id: 3, name: "Table 3", tab: 3},
  {id: 4, name: "Table 4", tab: 4},
  {id: 5, name: "Table 5", tab: 5},
  {id: 6, name: "Table 6", tab: 6}
];

App.Tab.FIXTURES = [
  {id: 1, tabItems: [1, 3] },
  {id: 2, tabItems: [] },
  {id: 3, tabItems: [4] },
  {id: 4, tabItems: [2] },
  {id: 5, tabItems: [] },
  {id: 6, tabItems: [] }
];

App.TabItem.FIXTURES = [
	{id: 1, food: 1, price: 10 },
	{id: 2, food: 2, price: 0 },
	{id: 3, food: 3, price: 1 },
	{id: 4, food: 4, price: 5.5 }
];

App.Food.FIXTURES = [
  {id: 1, name: "Birthday Cake", imagePath: "/images/birthdaycake.png", price: 10},
  {id: 2, name: "Fries", imagePath: "/images/fries.png", price: 7.5},
  {id: 3, name: "HotDog", imagePath: "/images/hotdog.png", price: 4},
  {id: 4, name: "Pancakes", imagePath: "/images/pancakes.png", price: 2.7},
  {id: 5, name: "Pizza", imagePath: "/images/pizza.png", price: 12.3}
];