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

    var req = _superagent2.default[opt.method.toLowerCase()](opt.endpoint);

    if (opt.headers) {
      req = req.set(opt.headers);
    }
    if (opt.query) {
      req = req.query(opt.query);
    }
    if (opt.body) {
      req = req.send(opt.body);
    }
    if (opt.withCredentials) {
      req = req.withCredentials();
    }

    if (opt.tail) {
      return (0, _createEventSource2.default)(req.url, opt, dispatch);
    }

    req.end(function (err, res) {
      if (err) {
        return dispatch({
          type: 'tahoe.failure',
          meta: opt,
          payload: err
        });
      }

      // handle json responses
      if (res.type === 'application/json') {
        return dispatch({
          type: 'tahoe.success',
          meta: opt,
          payload: {
            raw: res.body,
            normalized: (0, _entify2.default)(res.body, opt)
          }
        });
      }

      dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: new Error('Unknown response type')
      });
    });
  };
};

module.exports = exports['default'];