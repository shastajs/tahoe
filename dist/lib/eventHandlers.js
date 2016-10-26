'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var handlers = {};
handlers.open = function (_ref) {
  var options = _ref.options,
      dispatch = _ref.dispatch;
  return dispatch({
    type: 'tahoe.tail.open',
    meta: options
  });
};

handlers.insert = function (_ref2) {
  var options = _ref2.options,
      dispatch = _ref2.dispatch,
      next = _ref2.data.next;
  return dispatch({
    type: 'tahoe.tail.insert',
    meta: options,
    payload: {
      raw: next
    }
  });
};

handlers.update = function (_ref3) {
  var options = _ref3.options,
      dispatch = _ref3.dispatch,
      _ref3$data = _ref3.data,
      prev = _ref3$data.prev,
      next = _ref3$data.next;
  return dispatch({
    type: 'tahoe.tail.update',
    meta: options,
    payload: {
      raw: {
        prev: prev,
        next: next
      }
    }
  });
};

handlers.delete = function (_ref4) {
  var options = _ref4.options,
      dispatch = _ref4.dispatch,
      prev = _ref4.data.prev;
  return dispatch({
    type: 'tahoe.tail.delete',
    meta: options,
    payload: {
      raw: prev
    }
  });
};

exports.default = handlers;
module.exports = exports['default'];