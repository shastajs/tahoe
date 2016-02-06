'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _sendRequest = require('./sendRequest');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var result = function result(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};

// TODO:0 check entities cache in store and dont fetch if we have it already

/*
app must have redux-thunk installed
possible options:

- requestId (optional)(string)
- tail (default false)(boolean)
- method (required)(get, post, put, delete, or patch)
- params (object)
- endpoint (required)(url tring)
- model (required)(normalizr model)
- collection (default false)(boolean)

all options can either be a value, or a function that returns a value.
if you define a function, it will receive options.params as an argument
*/

exports.default = function () {
  var defaults = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  return function () {
    var opt = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    // merge our multitude of option objects together
    // defaults = options defined in createAction
    // opt = options specified in action creator
    var options = (0, _lodash2.default)((0, _lodash4.default)({}, opt, defaults), function (v, k, o) {
      return result(v, o.params);
    });

    if (!options.method) throw new Error('Missing method');
    if (!options.endpoint) throw new Error('Missing endpoint');

    return (0, _sendRequest2.default)(options);
  };
};

module.exports = exports['default'];