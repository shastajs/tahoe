'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _normalizr = require('normalizr');

exports.default = function (body, opt) {
  return (0, _normalizr.normalize)(body, opt.collection ? (0, _normalizr.arrayOf)(opt.model) : opt.model);
};

module.exports = exports['default'];