'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = function (url, opt, dispatch) {
  var src = new EventSource(url, opt);
  src.addEventListener('insert', handleMessage(opt, dispatch, handleInsert));
  src.addEventListener('update', handleMessage(opt, dispatch, handleUpdate));
  src.addEventListener('delete', handleMessage(opt, dispatch, handleDelete));
};

module.exports = exports['default'];