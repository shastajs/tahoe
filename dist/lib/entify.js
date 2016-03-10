'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

exports.default = function (body, _ref) {
  var collection = _ref.collection;
  var model = _ref.model;
  return (0, _normalizr.normalize)(body, collection ? (0, _normalizr.arrayOf)(model) : model);
};

module.exports = exports['default'];