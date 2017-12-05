'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOptions = undefined;

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _sendRequest = require('./sendRequest');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reserved = ['onResponse', 'onError'];
var result = function result(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};

// TODO:0 check entities cache in store and dont fetch if we have it already

/*
app must have redux-thunk installed
possible options:

- subset (optional)(string)
- tail (default false)(boolean)
- method (required)(get, post, put, delete, or patch)
- params (object)
- endpoint (required)(url tring)
- collection (default false)(boolean)
- fresh (default to false)(boolean)

all options can either be a value, or a function that returns a value.
if you define a function, it will receive options.params as an argument
*/

// merge our multitude of option objects together
// defaults = options defined in createAction
// opt = options specified in action creator
var isReserved = function isReserved(k) {
  return reserved.indexOf(k) !== -1;
};

var resolveFunctions = function resolveFunctions(o) {
  return (0, _lodash2.default)(o, function (v, k, _ref) {
    var params = _ref.params;
    return isReserved(k) ? v : result(v, params);
  });
};

var mergeOptions = exports.mergeOptions = function mergeOptions(defaults, opt) {
  return (0, _lodash4.default)({}, resolveFunctions(opt), resolveFunctions(defaults));
};

exports.default = function () {
  var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var nfn = function nfn() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var options = mergeOptions(defaults, opt);
    if (!options.method) throw new Error('Missing method');
    if (!options.endpoint) throw new Error('Missing endpoint');
    var fn = function fn(dispatch) {
      return (0, _sendRequest2.default)({ options: options, dispatch: dispatch });
    };
    fn.options = options;
    return fn;
  };
  nfn.options = defaults;
  return nfn;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlQWN0aW9uLmpzIl0sIm5hbWVzIjpbInJlc2VydmVkIiwicmVzdWx0IiwiZm4iLCJhcmciLCJpc1Jlc2VydmVkIiwiayIsImluZGV4T2YiLCJyZXNvbHZlRnVuY3Rpb25zIiwibyIsInYiLCJwYXJhbXMiLCJtZXJnZU9wdGlvbnMiLCJkZWZhdWx0cyIsIm9wdCIsIm5mbiIsIm9wdGlvbnMiLCJtZXRob2QiLCJFcnJvciIsImVuZHBvaW50IiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsQ0FDZixZQURlLEVBRWYsU0FGZSxDQUFqQjtBQUlBLElBQU1DLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxFQUFELEVBQUtDLEdBQUw7QUFBQSxTQUFhLE9BQU9ELEVBQVAsS0FBYyxVQUFkLEdBQTJCQSxHQUFHQyxHQUFILENBQTNCLEdBQXFDRCxFQUFsRDtBQUFBLENBQWY7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0EsSUFBTUUsYUFBYSxTQUFiQSxVQUFhLENBQUNDLENBQUQ7QUFBQSxTQUFPTCxTQUFTTSxPQUFULENBQWlCRCxDQUFqQixNQUF3QixDQUFDLENBQWhDO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsQ0FBRDtBQUFBLFNBQ3ZCLHNCQUFVQSxDQUFWLEVBQWEsVUFBQ0MsQ0FBRCxFQUFJSixDQUFKO0FBQUEsUUFBU0ssTUFBVCxRQUFTQSxNQUFUO0FBQUEsV0FDWE4sV0FBV0MsQ0FBWCxJQUFnQkksQ0FBaEIsR0FBb0JSLE9BQU9RLENBQVAsRUFBVUMsTUFBVixDQURUO0FBQUEsR0FBYixDQUR1QjtBQUFBLENBQXpCOztBQUtPLElBQU1DLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsUUFBRCxFQUFXQyxHQUFYO0FBQUEsU0FDMUIsc0JBQU0sRUFBTixFQUFVTixpQkFBaUJNLEdBQWpCLENBQVYsRUFBaUNOLGlCQUFpQkssUUFBakIsQ0FBakMsQ0FEMEI7QUFBQSxDQUFyQjs7a0JBR1EsWUFBbUI7QUFBQSxNQUFsQkEsUUFBa0IsdUVBQVAsRUFBTzs7QUFDaEMsTUFBTUUsTUFBTSxTQUFOQSxHQUFNLEdBQWM7QUFBQSxRQUFiRCxHQUFhLHVFQUFQLEVBQU87O0FBQ3hCLFFBQU1FLFVBQVVKLGFBQWFDLFFBQWIsRUFBdUJDLEdBQXZCLENBQWhCO0FBQ0EsUUFBSSxDQUFDRSxRQUFRQyxNQUFiLEVBQXFCLE1BQU0sSUFBSUMsS0FBSixDQUFVLGdCQUFWLENBQU47QUFDckIsUUFBSSxDQUFDRixRQUFRRyxRQUFiLEVBQXVCLE1BQU0sSUFBSUQsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDdkIsUUFBTWYsS0FBSyxTQUFMQSxFQUFLLENBQUNpQixRQUFEO0FBQUEsYUFBYywyQkFBWSxFQUFFSixnQkFBRixFQUFXSSxrQkFBWCxFQUFaLENBQWQ7QUFBQSxLQUFYO0FBQ0FqQixPQUFHYSxPQUFILEdBQWFBLE9BQWI7QUFDQSxXQUFPYixFQUFQO0FBQ0QsR0FQRDtBQVFBWSxNQUFJQyxPQUFKLEdBQWNILFFBQWQ7QUFDQSxTQUFPRSxHQUFQO0FBQ0QsQyIsImZpbGUiOiJjcmVhdGVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFwVmFsdWVzIGZyb20gJ2xvZGFzaC5tYXB2YWx1ZXMnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJ1xuaW1wb3J0IHNlbmRSZXF1ZXN0IGZyb20gJy4vc2VuZFJlcXVlc3QnXG5cbmNvbnN0IHJlc2VydmVkID0gW1xuICAnb25SZXNwb25zZScsXG4gICdvbkVycm9yJ1xuXVxuY29uc3QgcmVzdWx0ID0gKGZuLCBhcmcpID0+IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuKGFyZykgOiBmblxuXG4vLyBUT0RPOjAgY2hlY2sgZW50aXRpZXMgY2FjaGUgaW4gc3RvcmUgYW5kIGRvbnQgZmV0Y2ggaWYgd2UgaGF2ZSBpdCBhbHJlYWR5XG5cbi8qXG5hcHAgbXVzdCBoYXZlIHJlZHV4LXRodW5rIGluc3RhbGxlZFxucG9zc2libGUgb3B0aW9uczpcblxuLSBzdWJzZXQgKG9wdGlvbmFsKShzdHJpbmcpXG4tIHRhaWwgKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIG1ldGhvZCAocmVxdWlyZWQpKGdldCwgcG9zdCwgcHV0LCBkZWxldGUsIG9yIHBhdGNoKVxuLSBwYXJhbXMgKG9iamVjdClcbi0gZW5kcG9pbnQgKHJlcXVpcmVkKSh1cmwgdHJpbmcpXG4tIGNvbGxlY3Rpb24gKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIGZyZXNoIChkZWZhdWx0IHRvIGZhbHNlKShib29sZWFuKVxuXG5hbGwgb3B0aW9ucyBjYW4gZWl0aGVyIGJlIGEgdmFsdWUsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWUuXG5pZiB5b3UgZGVmaW5lIGEgZnVuY3Rpb24sIGl0IHdpbGwgcmVjZWl2ZSBvcHRpb25zLnBhcmFtcyBhcyBhbiBhcmd1bWVudFxuKi9cblxuLy8gbWVyZ2Ugb3VyIG11bHRpdHVkZSBvZiBvcHRpb24gb2JqZWN0cyB0b2dldGhlclxuLy8gZGVmYXVsdHMgPSBvcHRpb25zIGRlZmluZWQgaW4gY3JlYXRlQWN0aW9uXG4vLyBvcHQgPSBvcHRpb25zIHNwZWNpZmllZCBpbiBhY3Rpb24gY3JlYXRvclxuY29uc3QgaXNSZXNlcnZlZCA9IChrKSA9PiByZXNlcnZlZC5pbmRleE9mKGspICE9PSAtMVxuXG5jb25zdCByZXNvbHZlRnVuY3Rpb25zID0gKG8pID0+XG4gIG1hcFZhbHVlcyhvLCAodiwgaywgeyBwYXJhbXMgfSkgPT5cbiAgICBpc1Jlc2VydmVkKGspID8gdiA6IHJlc3VsdCh2LCBwYXJhbXMpXG4gIClcblxuZXhwb3J0IGNvbnN0IG1lcmdlT3B0aW9ucyA9IChkZWZhdWx0cywgb3B0KSA9PlxuICBtZXJnZSh7fSwgcmVzb2x2ZUZ1bmN0aW9ucyhvcHQpLCByZXNvbHZlRnVuY3Rpb25zKGRlZmF1bHRzKSlcblxuZXhwb3J0IGRlZmF1bHQgKGRlZmF1bHRzID0ge30pID0+IHtcbiAgY29uc3QgbmZuID0gKG9wdCA9IHt9KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhkZWZhdWx0cywgb3B0KVxuICAgIGlmICghb3B0aW9ucy5tZXRob2QpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBtZXRob2QnKVxuICAgIGlmICghb3B0aW9ucy5lbmRwb2ludCkgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVuZHBvaW50JylcbiAgICBjb25zdCBmbiA9IChkaXNwYXRjaCkgPT4gc2VuZFJlcXVlc3QoeyBvcHRpb25zLCBkaXNwYXRjaCB9KVxuICAgIGZuLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgcmV0dXJuIGZuXG4gIH1cbiAgbmZuLm9wdGlvbnMgPSBkZWZhdWx0c1xuICByZXR1cm4gbmZuXG59XG4iXX0=