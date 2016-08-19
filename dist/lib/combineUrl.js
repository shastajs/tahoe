'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (endpoint, query) {
  var ay = _url2.default.parse(endpoint, true);
  // TODO: use qs module
  delete ay.querystring;
  ay.query = (0, _extends3.default)({}, ay.query, query);
  return _url2.default.format(ay);
};

module.exports = exports['default'];