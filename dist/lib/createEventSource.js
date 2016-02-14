'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _entify = require('./entify');

var _entify2 = _interopRequireDefault(_entify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handleMessage = function handleMessage(opt, dispatch, fn) {
  return function (_ref) {
    var data = _ref.data;

    try {
      fn(JSON.parse(data), opt, dispatch);
    } catch (err) {
      dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      });
    }
  };
};

var handleInsert = function handleInsert(data, opt, dispatch) {
  return dispatch({
    type: 'tahoe.tail.insert',
    meta: opt,
    payload: {
      normalized: (0, _entify2.default)(data.next, opt),
      raw: data.next
    }
  });
};
var handleUpdate = function handleUpdate(data, opt, dispatch) {
  return dispatch({
    type: 'tahoe.tail.update',
    meta: opt,
    payload: {
      normalized: {
        prev: (0, _entify2.default)(data.prev, opt),
        next: (0, _entify2.default)(data.next, opt)
      },
      raw: {
        prev: data.prev,
        next: data.next
      }
    }
  });
};
var handleDelete = function handleDelete(data, opt, dispatch) {
  return dispatch({
    type: 'tahoe.tail.delete',
    meta: opt,
    payload: {
      normalized: (0, _entify2.default)(data.prev, opt),
      raw: data.prev
    }
  });
};

var combineUrl = function combineUrl(endpoint, query) {
  var ay = _url2.default.parse(endpoint, true);
  delete ay.querystring;
  ay.query = (0, _extends3.default)({}, ay.query, query);
  return _url2.default.format(ay);
};

exports.default = function (opt, dispatch) {
  var finalUrl = combineUrl(opt.endpoint, opt.query);
  var src = new EventSource(finalUrl, { withCredentials: opt.withCredentials });
  src.addEventListener('insert', handleMessage(opt, dispatch, handleInsert));
  src.addEventListener('update', handleMessage(opt, dispatch, handleUpdate));
  src.addEventListener('delete', handleMessage(opt, dispatch, handleDelete));
};

module.exports = exports['default'];