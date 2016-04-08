'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _entify = require('./entify');

var _entify2 = _interopRequireDefault(_entify);

var _createEventSource = require('./createEventSource');

var _createEventSource2 = _interopRequireDefault(_createEventSource);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (opt) {
  return function (dispatch) {
    dispatch({
      type: 'tahoe.request',
      payload: opt
    });

    if (opt.tail) {
      return (0, _createEventSource2.default)(opt, dispatch);
    }

    var req = _superagent2.default[opt.method.toLowerCase()](opt.endpoint);
    var debug = opt.method.toUpperCase() + ' ' + opt.endpoint;
    if (opt.headers) {
      req.set(opt.headers);
    }
    if (opt.query) {
      req.query(opt.query);
    }
    if (opt.body) {
      req.send(opt.body);
    }
    if (opt.withCredentials) {
      req.withCredentials();
    }

    req.end(function (err, res) {
      if (!res && !err) {
        err = new Error('Connection failed: ' + debug);
      }
      if (!err && res.type !== 'application/json') {
        err = new Error('Unknown response type: \'' + res.type + '\' from ' + debug);
      }
      if (err) {
        if (opt.onError) opt.onError(err);
        return dispatch({
          type: 'tahoe.failure',
          meta: opt,
          payload: err
        });
      }

      // handle json responses
      if (opt.onResponse) opt.onResponse(res);
      dispatch({
        type: 'tahoe.success',
        meta: opt,
        payload: {
          raw: res.body,
          normalized: opt.model ? (0, _entify2.default)(res.body, opt) : null
        }
      });
    });
  };
};

module.exports = exports['default'];