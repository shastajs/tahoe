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

var resolveFunctions = function resolveFunctions(o, params) {
  return (0, _lodash2.default)(o, function (v, k) {
    return isReserved(k) ? v : result(v, params);
  });
};

var mergeOptions = exports.mergeOptions = function mergeOptions(defaults, opt) {
  var defaultParams = defaults.params ? result(defaults.params) : {};
  var optParams = opt.params ? result(opt.params) : {};
  var params = (0, _lodash4.default)({}, optParams, defaultParams);
  return (0, _lodash4.default)({}, resolveFunctions(opt, params), resolveFunctions(defaults, params));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlQWN0aW9uLmpzIl0sIm5hbWVzIjpbInJlc2VydmVkIiwicmVzdWx0IiwiZm4iLCJhcmciLCJpc1Jlc2VydmVkIiwiayIsImluZGV4T2YiLCJyZXNvbHZlRnVuY3Rpb25zIiwibyIsInBhcmFtcyIsInYiLCJtZXJnZU9wdGlvbnMiLCJkZWZhdWx0cyIsIm9wdCIsImRlZmF1bHRQYXJhbXMiLCJvcHRQYXJhbXMiLCJuZm4iLCJvcHRpb25zIiwibWV0aG9kIiwiRXJyb3IiLCJlbmRwb2ludCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLENBQ2YsWUFEZSxFQUVmLFNBRmUsQ0FBakI7QUFJQSxJQUFNQyxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0MsRUFBRCxFQUFLQyxHQUFMO0FBQUEsU0FBYSxPQUFPRCxFQUFQLEtBQWMsVUFBZCxHQUEyQkEsR0FBR0MsR0FBSCxDQUEzQixHQUFxQ0QsRUFBbEQ7QUFBQSxDQUFmOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7QUFDQTtBQUNBLElBQU1FLGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxDQUFEO0FBQUEsU0FBT0wsU0FBU00sT0FBVCxDQUFpQkQsQ0FBakIsTUFBd0IsQ0FBQyxDQUFoQztBQUFBLENBQW5COztBQUVBLElBQU1FLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQUNDLENBQUQsRUFBSUMsTUFBSjtBQUFBLFNBQ3ZCLHNCQUFVRCxDQUFWLEVBQWEsVUFBQ0UsQ0FBRCxFQUFJTCxDQUFKO0FBQUEsV0FDWEQsV0FBV0MsQ0FBWCxJQUFnQkssQ0FBaEIsR0FBb0JULE9BQU9TLENBQVAsRUFBVUQsTUFBVixDQURUO0FBQUEsR0FBYixDQUR1QjtBQUFBLENBQXpCOztBQUtPLElBQU1FLHNDQUFlLFNBQWZBLFlBQWUsQ0FBQ0MsUUFBRCxFQUFXQyxHQUFYLEVBQW1CO0FBQzdDLE1BQU1DLGdCQUFnQkYsU0FBU0gsTUFBVCxHQUFrQlIsT0FBT1csU0FBU0gsTUFBaEIsQ0FBbEIsR0FBNEMsRUFBbEU7QUFDQSxNQUFNTSxZQUFZRixJQUFJSixNQUFKLEdBQWFSLE9BQU9ZLElBQUlKLE1BQVgsQ0FBYixHQUFrQyxFQUFwRDtBQUNBLE1BQU1BLFNBQVMsc0JBQU0sRUFBTixFQUFVTSxTQUFWLEVBQXFCRCxhQUFyQixDQUFmO0FBQ0EsU0FBTyxzQkFBTSxFQUFOLEVBQVVQLGlCQUFpQk0sR0FBakIsRUFBc0JKLE1BQXRCLENBQVYsRUFBeUNGLGlCQUFpQkssUUFBakIsRUFBMkJILE1BQTNCLENBQXpDLENBQVA7QUFDRCxDQUxNOztrQkFPUSxZQUFtQjtBQUFBLE1BQWxCRyxRQUFrQix1RUFBUCxFQUFPOztBQUNoQyxNQUFNSSxNQUFNLFNBQU5BLEdBQU0sR0FBYztBQUFBLFFBQWJILEdBQWEsdUVBQVAsRUFBTzs7QUFDeEIsUUFBTUksVUFBVU4sYUFBYUMsUUFBYixFQUF1QkMsR0FBdkIsQ0FBaEI7QUFDQSxRQUFJLENBQUNJLFFBQVFDLE1BQWIsRUFBcUIsTUFBTSxJQUFJQyxLQUFKLENBQVUsZ0JBQVYsQ0FBTjtBQUNyQixRQUFJLENBQUNGLFFBQVFHLFFBQWIsRUFBdUIsTUFBTSxJQUFJRCxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUN2QixRQUFNakIsS0FBSyxTQUFMQSxFQUFLLENBQUNtQixRQUFEO0FBQUEsYUFBYywyQkFBWSxFQUFFSixnQkFBRixFQUFXSSxrQkFBWCxFQUFaLENBQWQ7QUFBQSxLQUFYO0FBQ0FuQixPQUFHZSxPQUFILEdBQWFBLE9BQWI7QUFDQSxXQUFPZixFQUFQO0FBQ0QsR0FQRDtBQVFBYyxNQUFJQyxPQUFKLEdBQWNMLFFBQWQ7QUFDQSxTQUFPSSxHQUFQO0FBQ0QsQyIsImZpbGUiOiJjcmVhdGVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFwVmFsdWVzIGZyb20gJ2xvZGFzaC5tYXB2YWx1ZXMnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJ1xuaW1wb3J0IHNlbmRSZXF1ZXN0IGZyb20gJy4vc2VuZFJlcXVlc3QnXG5cbmNvbnN0IHJlc2VydmVkID0gW1xuICAnb25SZXNwb25zZScsXG4gICdvbkVycm9yJ1xuXVxuY29uc3QgcmVzdWx0ID0gKGZuLCBhcmcpID0+IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuKGFyZykgOiBmblxuXG4vLyBUT0RPOjAgY2hlY2sgZW50aXRpZXMgY2FjaGUgaW4gc3RvcmUgYW5kIGRvbnQgZmV0Y2ggaWYgd2UgaGF2ZSBpdCBhbHJlYWR5XG5cbi8qXG5hcHAgbXVzdCBoYXZlIHJlZHV4LXRodW5rIGluc3RhbGxlZFxucG9zc2libGUgb3B0aW9uczpcblxuLSBzdWJzZXQgKG9wdGlvbmFsKShzdHJpbmcpXG4tIHRhaWwgKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIG1ldGhvZCAocmVxdWlyZWQpKGdldCwgcG9zdCwgcHV0LCBkZWxldGUsIG9yIHBhdGNoKVxuLSBwYXJhbXMgKG9iamVjdClcbi0gZW5kcG9pbnQgKHJlcXVpcmVkKSh1cmwgdHJpbmcpXG4tIGNvbGxlY3Rpb24gKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIGZyZXNoIChkZWZhdWx0IHRvIGZhbHNlKShib29sZWFuKVxuXG5hbGwgb3B0aW9ucyBjYW4gZWl0aGVyIGJlIGEgdmFsdWUsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWUuXG5pZiB5b3UgZGVmaW5lIGEgZnVuY3Rpb24sIGl0IHdpbGwgcmVjZWl2ZSBvcHRpb25zLnBhcmFtcyBhcyBhbiBhcmd1bWVudFxuKi9cblxuLy8gbWVyZ2Ugb3VyIG11bHRpdHVkZSBvZiBvcHRpb24gb2JqZWN0cyB0b2dldGhlclxuLy8gZGVmYXVsdHMgPSBvcHRpb25zIGRlZmluZWQgaW4gY3JlYXRlQWN0aW9uXG4vLyBvcHQgPSBvcHRpb25zIHNwZWNpZmllZCBpbiBhY3Rpb24gY3JlYXRvclxuY29uc3QgaXNSZXNlcnZlZCA9IChrKSA9PiByZXNlcnZlZC5pbmRleE9mKGspICE9PSAtMVxuXG5jb25zdCByZXNvbHZlRnVuY3Rpb25zID0gKG8sIHBhcmFtcykgPT5cbiAgbWFwVmFsdWVzKG8sICh2LCBrKSA9PlxuICAgIGlzUmVzZXJ2ZWQoaykgPyB2IDogcmVzdWx0KHYsIHBhcmFtcylcbiAgKVxuXG5leHBvcnQgY29uc3QgbWVyZ2VPcHRpb25zID0gKGRlZmF1bHRzLCBvcHQpID0+IHtcbiAgY29uc3QgZGVmYXVsdFBhcmFtcyA9IGRlZmF1bHRzLnBhcmFtcyA/IHJlc3VsdChkZWZhdWx0cy5wYXJhbXMpIDoge31cbiAgY29uc3Qgb3B0UGFyYW1zID0gb3B0LnBhcmFtcyA/IHJlc3VsdChvcHQucGFyYW1zKSA6IHt9XG4gIGNvbnN0IHBhcmFtcyA9IG1lcmdlKHt9LCBvcHRQYXJhbXMsIGRlZmF1bHRQYXJhbXMpXG4gIHJldHVybiBtZXJnZSh7fSwgcmVzb2x2ZUZ1bmN0aW9ucyhvcHQsIHBhcmFtcyksIHJlc29sdmVGdW5jdGlvbnMoZGVmYXVsdHMsIHBhcmFtcykpXG59XG5cbmV4cG9ydCBkZWZhdWx0IChkZWZhdWx0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IG5mbiA9IChvcHQgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdClcbiAgICBpZiAoIW9wdGlvbnMubWV0aG9kKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWV0aG9kJylcbiAgICBpZiAoIW9wdGlvbnMuZW5kcG9pbnQpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbmRwb2ludCcpXG4gICAgY29uc3QgZm4gPSAoZGlzcGF0Y2gpID0+IHNlbmRSZXF1ZXN0KHsgb3B0aW9ucywgZGlzcGF0Y2ggfSlcbiAgICBmbi5vcHRpb25zID0gb3B0aW9uc1xuICAgIHJldHVybiBmblxuICB9XG4gIG5mbi5vcHRpb25zID0gZGVmYXVsdHNcbiAgcmV0dXJuIG5mblxufVxuIl19