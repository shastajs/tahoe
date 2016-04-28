'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _combineUrl = require('./combineUrl');

var _combineUrl2 = _interopRequireDefault(_combineUrl);

var _eventHandlers = require('./eventHandlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tryParse = function tryParse(_ref) {
  var data = _ref.data;
  var options = _ref.options;
  var dispatch = _ref.dispatch;

  try {
    return JSON.parse(data);
  } catch (err) {
    dispatch({
      type: 'tahoe.failure',
      meta: options,
      payload: err
    });
  }
};

exports.default = function (_ref2) {
  var options = _ref2.options;
  var dispatch = _ref2.dispatch;

  var finalUrl = (0, _combineUrl2.default)(options.endpoint, options.query);
  var src = new EventSource(finalUrl, { withCredentials: options.withCredentials });

  // wire up listeners n shiz
  (0, _keys2.default)(_eventHandlers2.default).forEach(function (eventName) {
    var handler = _eventHandlers2.default[eventName];
    src.addEventListener(eventName, function (_ref3) {
      var data = _ref3.data;

      var parsed = data && tryParse(data);
      if (data && typeof parsed === 'undefined') return;
      handler({ data: parsed, options: options, dispatch: dispatch });
    }, false);
  });
};

module.exports = exports['default'];