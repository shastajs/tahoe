'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeOptions = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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
    var fn = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', (0, _sendRequest2.default)({ options: options, dispatch: dispatch }));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function fn(_x3) {
        return _ref.apply(this, arguments);
      };
    }();
    fn.options = options;
    return fn;
  };
  nfn.options = defaults;
  return nfn;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlQWN0aW9uLmpzIl0sIm5hbWVzIjpbInJlc2VydmVkIiwicmVzdWx0IiwiZm4iLCJhcmciLCJpc1Jlc2VydmVkIiwiayIsImluZGV4T2YiLCJyZXNvbHZlRnVuY3Rpb25zIiwibyIsInBhcmFtcyIsInYiLCJtZXJnZU9wdGlvbnMiLCJkZWZhdWx0cyIsIm9wdCIsImRlZmF1bHRQYXJhbXMiLCJvcHRQYXJhbXMiLCJuZm4iLCJvcHRpb25zIiwibWV0aG9kIiwiRXJyb3IiLCJlbmRwb2ludCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsQ0FDZixZQURlLEVBRWYsU0FGZSxDQUFqQjtBQUlBLElBQU1DLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxFQUFELEVBQUtDLEdBQUw7QUFBQSxTQUFhLE9BQU9ELEVBQVAsS0FBYyxVQUFkLEdBQTJCQSxHQUFHQyxHQUFILENBQTNCLEdBQXFDRCxFQUFsRDtBQUFBLENBQWY7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTtBQUNBO0FBQ0EsSUFBTUUsYUFBYSxTQUFiQSxVQUFhLENBQUNDLENBQUQ7QUFBQSxTQUFPTCxTQUFTTSxPQUFULENBQWlCRCxDQUFqQixNQUF3QixDQUFDLENBQWhDO0FBQUEsQ0FBbkI7O0FBRUEsSUFBTUUsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsQ0FBRCxFQUFJQyxNQUFKO0FBQUEsU0FDdkIsc0JBQVVELENBQVYsRUFBYSxVQUFDRSxDQUFELEVBQUlMLENBQUo7QUFBQSxXQUNYRCxXQUFXQyxDQUFYLElBQWdCSyxDQUFoQixHQUFvQlQsT0FBT1MsQ0FBUCxFQUFVRCxNQUFWLENBRFQ7QUFBQSxHQUFiLENBRHVCO0FBQUEsQ0FBekI7O0FBS08sSUFBTUUsc0NBQWUsU0FBZkEsWUFBZSxDQUFDQyxRQUFELEVBQVdDLEdBQVgsRUFBbUI7QUFDN0MsTUFBTUMsZ0JBQWdCRixTQUFTSCxNQUFULEdBQWtCUixPQUFPVyxTQUFTSCxNQUFoQixDQUFsQixHQUE0QyxFQUFsRTtBQUNBLE1BQU1NLFlBQVlGLElBQUlKLE1BQUosR0FBYVIsT0FBT1ksSUFBSUosTUFBWCxDQUFiLEdBQWtDLEVBQXBEO0FBQ0EsTUFBTUEsU0FBUyxzQkFBTSxFQUFOLEVBQVVNLFNBQVYsRUFBcUJELGFBQXJCLENBQWY7QUFDQSxTQUFPLHNCQUFNLEVBQU4sRUFBVVAsaUJBQWlCTSxHQUFqQixFQUFzQkosTUFBdEIsQ0FBVixFQUF5Q0YsaUJBQWlCSyxRQUFqQixFQUEyQkgsTUFBM0IsQ0FBekMsQ0FBUDtBQUNELENBTE07O2tCQU9RLFlBQW1CO0FBQUEsTUFBbEJHLFFBQWtCLHVFQUFQLEVBQU87O0FBQ2hDLE1BQU1JLE1BQU0sU0FBTkEsR0FBTSxHQUFjO0FBQUEsUUFBYkgsR0FBYSx1RUFBUCxFQUFPOztBQUN4QixRQUFNSSxVQUFVTixhQUFhQyxRQUFiLEVBQXVCQyxHQUF2QixDQUFoQjtBQUNBLFFBQUksQ0FBQ0ksUUFBUUMsTUFBYixFQUFxQixNQUFNLElBQUlDLEtBQUosQ0FBVSxnQkFBVixDQUFOO0FBQ3JCLFFBQUksQ0FBQ0YsUUFBUUcsUUFBYixFQUF1QixNQUFNLElBQUlELEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBQ3ZCLFFBQU1qQjtBQUFBLDBGQUFLLGlCQUFPbUIsUUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaURBQW9CLDJCQUFZLEVBQUVKLGdCQUFGLEVBQVdJLGtCQUFYLEVBQVosQ0FBcEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBTDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUFOO0FBQ0FuQixPQUFHZSxPQUFILEdBQWFBLE9BQWI7QUFDQSxXQUFPZixFQUFQO0FBQ0QsR0FQRDtBQVFBYyxNQUFJQyxPQUFKLEdBQWNMLFFBQWQ7QUFDQSxTQUFPSSxHQUFQO0FBQ0QsQyIsImZpbGUiOiJjcmVhdGVBY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFwVmFsdWVzIGZyb20gJ2xvZGFzaC5tYXB2YWx1ZXMnXG5pbXBvcnQgbWVyZ2UgZnJvbSAnbG9kYXNoLm1lcmdlJ1xuaW1wb3J0IHNlbmRSZXF1ZXN0IGZyb20gJy4vc2VuZFJlcXVlc3QnXG5cbmNvbnN0IHJlc2VydmVkID0gW1xuICAnb25SZXNwb25zZScsXG4gICdvbkVycm9yJ1xuXVxuY29uc3QgcmVzdWx0ID0gKGZuLCBhcmcpID0+IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuKGFyZykgOiBmblxuXG4vLyBUT0RPOjAgY2hlY2sgZW50aXRpZXMgY2FjaGUgaW4gc3RvcmUgYW5kIGRvbnQgZmV0Y2ggaWYgd2UgaGF2ZSBpdCBhbHJlYWR5XG5cbi8qXG5hcHAgbXVzdCBoYXZlIHJlZHV4LXRodW5rIGluc3RhbGxlZFxucG9zc2libGUgb3B0aW9uczpcblxuLSBzdWJzZXQgKG9wdGlvbmFsKShzdHJpbmcpXG4tIHRhaWwgKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIG1ldGhvZCAocmVxdWlyZWQpKGdldCwgcG9zdCwgcHV0LCBkZWxldGUsIG9yIHBhdGNoKVxuLSBwYXJhbXMgKG9iamVjdClcbi0gZW5kcG9pbnQgKHJlcXVpcmVkKSh1cmwgdHJpbmcpXG4tIGNvbGxlY3Rpb24gKGRlZmF1bHQgZmFsc2UpKGJvb2xlYW4pXG4tIGZyZXNoIChkZWZhdWx0IHRvIGZhbHNlKShib29sZWFuKVxuXG5hbGwgb3B0aW9ucyBjYW4gZWl0aGVyIGJlIGEgdmFsdWUsIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgdmFsdWUuXG5pZiB5b3UgZGVmaW5lIGEgZnVuY3Rpb24sIGl0IHdpbGwgcmVjZWl2ZSBvcHRpb25zLnBhcmFtcyBhcyBhbiBhcmd1bWVudFxuKi9cblxuLy8gbWVyZ2Ugb3VyIG11bHRpdHVkZSBvZiBvcHRpb24gb2JqZWN0cyB0b2dldGhlclxuLy8gZGVmYXVsdHMgPSBvcHRpb25zIGRlZmluZWQgaW4gY3JlYXRlQWN0aW9uXG4vLyBvcHQgPSBvcHRpb25zIHNwZWNpZmllZCBpbiBhY3Rpb24gY3JlYXRvclxuY29uc3QgaXNSZXNlcnZlZCA9IChrKSA9PiByZXNlcnZlZC5pbmRleE9mKGspICE9PSAtMVxuXG5jb25zdCByZXNvbHZlRnVuY3Rpb25zID0gKG8sIHBhcmFtcykgPT5cbiAgbWFwVmFsdWVzKG8sICh2LCBrKSA9PlxuICAgIGlzUmVzZXJ2ZWQoaykgPyB2IDogcmVzdWx0KHYsIHBhcmFtcylcbiAgKVxuXG5leHBvcnQgY29uc3QgbWVyZ2VPcHRpb25zID0gKGRlZmF1bHRzLCBvcHQpID0+IHtcbiAgY29uc3QgZGVmYXVsdFBhcmFtcyA9IGRlZmF1bHRzLnBhcmFtcyA/IHJlc3VsdChkZWZhdWx0cy5wYXJhbXMpIDoge31cbiAgY29uc3Qgb3B0UGFyYW1zID0gb3B0LnBhcmFtcyA/IHJlc3VsdChvcHQucGFyYW1zKSA6IHt9XG4gIGNvbnN0IHBhcmFtcyA9IG1lcmdlKHt9LCBvcHRQYXJhbXMsIGRlZmF1bHRQYXJhbXMpXG4gIHJldHVybiBtZXJnZSh7fSwgcmVzb2x2ZUZ1bmN0aW9ucyhvcHQsIHBhcmFtcyksIHJlc29sdmVGdW5jdGlvbnMoZGVmYXVsdHMsIHBhcmFtcykpXG59XG5cbmV4cG9ydCBkZWZhdWx0IChkZWZhdWx0cyA9IHt9KSA9PiB7XG4gIGNvbnN0IG5mbiA9IChvcHQgPSB7fSkgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdClcbiAgICBpZiAoIW9wdGlvbnMubWV0aG9kKSB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgbWV0aG9kJylcbiAgICBpZiAoIW9wdGlvbnMuZW5kcG9pbnQpIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbmRwb2ludCcpXG4gICAgY29uc3QgZm4gPSBhc3luYyAoZGlzcGF0Y2gpID0+IHNlbmRSZXF1ZXN0KHsgb3B0aW9ucywgZGlzcGF0Y2ggfSlcbiAgICBmbi5vcHRpb25zID0gb3B0aW9uc1xuICAgIHJldHVybiBmblxuICB9XG4gIG5mbi5vcHRpb25zID0gZGVmYXVsdHNcbiAgcmV0dXJuIG5mblxufVxuIl19