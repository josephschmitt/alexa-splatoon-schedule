'use strict';

var _ = require('underscore');

String.prototype.toTitleCase = function() {
  var exceptions = ['a', 'an', 'the', 'at', 'by', 'for', 'in', 'of', 'on', 'to', 'up', 'and', 'as', 'but', 'or', 'nor'];
  return _.map(this.split(' '), function(word) {
    return _.find(exceptions, function(compare) {
      return compare === word.toLowerCase();
    }) ? word : word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};
