(function () {
  Ember.Handlebars.registerBoundHelper('dateFormat', function (date) {
    if (!date) return '';
    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        zeroPad = function (value) { return (value < 10 ? '0' : '') + value };
    return year + '-' + zeroPad(month) + '-' + zeroPad(day);
  });
})();
