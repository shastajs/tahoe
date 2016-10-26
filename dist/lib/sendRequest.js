'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _createEventSource = require('./createEventSource');

var _createEventSource2 = _interopRequireDefault(_createEventSource);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResponseHandler = function createResponseHandler(_ref) {
  var options = _ref.options,
      dispatch = _ref.dispatch;

  var debug = options.method.toUpperCase() + ' ' + options.endpoint;
  return function (err, res) {
    if (!res && !err) {
      err = new Error('Connection failed: ' + debug);
    }
    if (!err && res.type !== 'application/json') {
      err = new Error('Unknown response type: \'' + res.type + '\' from ' + debug);
    }
    if (err) {
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      });
      if (options.onError) options.onError(err);
      return;
    }

    // handle json responses
    dispatch({
      type: 'tahoe.success',
      meta: options,
      payload: {
        raw: res.body
      }
    });
    if (options.onResponse) options.onResponse(res);
  };
};

exports.default = function (_ref2) {
  var options = _ref2.options,
      dispatch = _ref2.dispatch;

  dispatch({
    type: 'tahoe.request',
    payload: options
  });

  if (options.tail) {
    (0, _createEventSource2.default)({ options: options, dispatch: dispatch });
    return;
  }

  var req = _superagent2.default[options.method.toLowerCase()](options.endpoint);
  if (options.headers) {
    req.set(options.headers);
  }
  if (options.query) {
    req.query(typeof options.query === 'string' ? options.query : _qs2.default.stringify(options.query, { strictNullHandling: true }));
  }
  if (options.body) {
    req.send(options.body);
  }
  if (options.withCredentials) {
    req.withCredentials();
  }

  req.end(createResponseHandler({ options: options, dispatch: dispatch }));
};

module.exports = exports['default'];