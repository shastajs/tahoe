'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _createEventSource = require('./createEventSource');

var _createEventSource2 = _interopRequireDefault(_createEventSource);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResponseHandler = function createResponseHandler(_ref) {
  var options = _ref.options,
      dispatch = _ref.dispatch,
      reject = _ref.reject,
      resolve = _ref.resolve;

  var debug = options.method.toUpperCase() + ' ' + options.endpoint;
  return function (err, res) {
    if (!res && !err) {
      err = new Error('Connection failed: ' + debug);
    }
    if (err) {
      err.res = res;
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      });
      if (options.onError) options.onError(err, res);
      return reject(err);
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
    resolve(res);
  };
};

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
    var options = _ref3.options,
        dispatch = _ref3.dispatch;
    var req;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch({
              type: 'tahoe.request',
              payload: options
            });

            if (!options.tail) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', (0, _createEventSource2.default)({ options: options, dispatch: dispatch }));

          case 3:
            req = _superagent2.default[options.method.toLowerCase()](options.endpoint);

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

            return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
              req.end(createResponseHandler({
                options: options,
                dispatch: dispatch,
                reject: reject,
                resolve: resolve
              }));
            }));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwicmVqZWN0IiwicmVzb2x2ZSIsImRlYnVnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJlbmRwb2ludCIsImVyciIsInJlcyIsIkVycm9yIiwidHlwZSIsIm1ldGEiLCJwYXlsb2FkIiwib25FcnJvciIsInJhdyIsImJvZHkiLCJvblJlc3BvbnNlIiwidGFpbCIsInJlcSIsInRvTG93ZXJDYXNlIiwiaGVhZGVycyIsInNldCIsInF1ZXJ5Iiwic3RyaW5naWZ5Iiwic3RyaWN0TnVsbEhhbmRsaW5nIiwic2VuZCIsIndpdGhDcmVkZW50aWFscyIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSx3QkFBd0IsU0FBeEJBLHFCQUF3QixPQUE0QztBQUFBLE1BQXpDQyxPQUF5QyxRQUF6Q0EsT0FBeUM7QUFBQSxNQUFoQ0MsUUFBZ0MsUUFBaENBLFFBQWdDO0FBQUEsTUFBdEJDLE1BQXNCLFFBQXRCQSxNQUFzQjtBQUFBLE1BQWRDLE9BQWMsUUFBZEEsT0FBYzs7QUFDeEUsTUFBTUMsUUFBV0osUUFBUUssTUFBUixDQUFlQyxXQUFmLEVBQVgsU0FBMkNOLFFBQVFPLFFBQXpEO0FBQ0EsU0FBTyxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNuQixRQUFJLENBQUNBLEdBQUQsSUFBUSxDQUFDRCxHQUFiLEVBQWtCO0FBQ2hCQSxZQUFNLElBQUlFLEtBQUoseUJBQWdDTixLQUFoQyxDQUFOO0FBQ0Q7QUFDRCxRQUFJSSxHQUFKLEVBQVM7QUFDUEEsVUFBSUMsR0FBSixHQUFVQSxHQUFWO0FBQ0FSLGVBQVM7QUFDUFUsY0FBTSxlQURDO0FBRVBDLGNBQU1aLE9BRkM7QUFHUGEsaUJBQVNMO0FBSEYsT0FBVDtBQUtBLFVBQUlSLFFBQVFjLE9BQVosRUFBcUJkLFFBQVFjLE9BQVIsQ0FBZ0JOLEdBQWhCLEVBQXFCQyxHQUFyQjtBQUNyQixhQUFPUCxPQUFPTSxHQUFQLENBQVA7QUFDRDs7QUFFRDtBQUNBUCxhQUFTO0FBQ1BVLFlBQU0sZUFEQztBQUVQQyxZQUFNWixPQUZDO0FBR1BhLGVBQVM7QUFDUEUsYUFBS04sSUFBSU87QUFERjtBQUhGLEtBQVQ7QUFPQSxRQUFJaEIsUUFBUWlCLFVBQVosRUFBd0JqQixRQUFRaUIsVUFBUixDQUFtQlIsR0FBbkI7QUFDeEJOLFlBQVFNLEdBQVI7QUFDRCxHQXpCRDtBQTBCRCxDQTVCRDs7O3VGQThCZTtBQUFBLFFBQVNULE9BQVQsU0FBU0EsT0FBVDtBQUFBLFFBQWtCQyxRQUFsQixTQUFrQkEsUUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JBLHFCQUFTO0FBQ1BVLG9CQUFNLGVBREM7QUFFUEUsdUJBQVNiO0FBRkYsYUFBVDs7QUFEYSxpQkFNVEEsUUFBUWtCLElBTkM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkNBT0osaUNBQWtCLEVBQUVsQixnQkFBRixFQUFXQyxrQkFBWCxFQUFsQixDQVBJOztBQUFBO0FBVVBrQixlQVZPLEdBVUQscUJBQVFuQixRQUFRSyxNQUFSLENBQWVlLFdBQWYsRUFBUixFQUFzQ3BCLFFBQVFPLFFBQTlDLENBVkM7O0FBV2IsZ0JBQUlQLFFBQVFxQixPQUFaLEVBQXFCO0FBQ25CRixrQkFBSUcsR0FBSixDQUFRdEIsUUFBUXFCLE9BQWhCO0FBQ0Q7QUFDRCxnQkFBSXJCLFFBQVF1QixLQUFaLEVBQW1CO0FBQ2pCSixrQkFBSUksS0FBSixDQUFVLE9BQU92QixRQUFRdUIsS0FBZixLQUF5QixRQUF6QixHQUNOdkIsUUFBUXVCLEtBREYsR0FFTixhQUFHQyxTQUFILENBQWF4QixRQUFRdUIsS0FBckIsRUFBNEIsRUFBRUUsb0JBQW9CLElBQXRCLEVBQTVCLENBRko7QUFHRDtBQUNELGdCQUFJekIsUUFBUWdCLElBQVosRUFBa0I7QUFDaEJHLGtCQUFJTyxJQUFKLENBQVMxQixRQUFRZ0IsSUFBakI7QUFDRDtBQUNELGdCQUFJaEIsUUFBUTJCLGVBQVosRUFBNkI7QUFDM0JSLGtCQUFJUSxlQUFKO0FBQ0Q7O0FBeEJZLDZDQTBCTixzQkFBWSxVQUFDeEIsT0FBRCxFQUFVRCxNQUFWLEVBQXFCO0FBQ3RDaUIsa0JBQUlTLEdBQUosQ0FBUTdCLHNCQUFzQjtBQUM1QkMsZ0NBRDRCO0FBRTVCQyxrQ0FGNEI7QUFHNUJDLDhCQUg0QjtBQUk1QkM7QUFKNEIsZUFBdEIsQ0FBUjtBQU1ELGFBUE0sQ0ExQk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJzZW5kUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnXG5pbXBvcnQgY3JlYXRlRXZlbnRTb3VyY2UgZnJvbSAnLi9jcmVhdGVFdmVudFNvdXJjZSdcbmltcG9ydCBxcyBmcm9tICdxcydcblxuY29uc3QgY3JlYXRlUmVzcG9uc2VIYW5kbGVyID0gKHsgb3B0aW9ucywgZGlzcGF0Y2gsIHJlamVjdCwgcmVzb2x2ZSB9KSA9PiB7XG4gIGNvbnN0IGRlYnVnID0gYCR7b3B0aW9ucy5tZXRob2QudG9VcHBlckNhc2UoKX0gJHtvcHRpb25zLmVuZHBvaW50fWBcbiAgcmV0dXJuIChlcnIsIHJlcykgPT4ge1xuICAgIGlmICghcmVzICYmICFlcnIpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihgQ29ubmVjdGlvbiBmYWlsZWQ6ICR7ZGVidWd9YClcbiAgICB9XG4gICAgaWYgKGVycikge1xuICAgICAgZXJyLnJlcyA9IHJlc1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAndGFob2UuZmFpbHVyZScsXG4gICAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICAgIHBheWxvYWQ6IGVyclxuICAgICAgfSlcbiAgICAgIGlmIChvcHRpb25zLm9uRXJyb3IpIG9wdGlvbnMub25FcnJvcihlcnIsIHJlcylcbiAgICAgIHJldHVybiByZWplY3QoZXJyKVxuICAgIH1cblxuICAgIC8vIGhhbmRsZSBqc29uIHJlc3BvbnNlc1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICd0YWhvZS5zdWNjZXNzJyxcbiAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHJhdzogcmVzLmJvZHlcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChvcHRpb25zLm9uUmVzcG9uc2UpIG9wdGlvbnMub25SZXNwb25zZShyZXMpXG4gICAgcmVzb2x2ZShyZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogJ3RhaG9lLnJlcXVlc3QnLFxuICAgIHBheWxvYWQ6IG9wdGlvbnNcbiAgfSlcblxuICBpZiAob3B0aW9ucy50YWlsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUV2ZW50U291cmNlKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSlcbiAgfVxuXG4gIGNvbnN0IHJlcSA9IHJlcXVlc3Rbb3B0aW9ucy5tZXRob2QudG9Mb3dlckNhc2UoKV0ob3B0aW9ucy5lbmRwb2ludClcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIHJlcS5zZXQob3B0aW9ucy5oZWFkZXJzKVxuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5KSB7XG4gICAgcmVxLnF1ZXJ5KHR5cGVvZiBvcHRpb25zLnF1ZXJ5ID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHRpb25zLnF1ZXJ5XG4gICAgICA6IHFzLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5LCB7IHN0cmljdE51bGxIYW5kbGluZzogdHJ1ZSB9KSlcbiAgfVxuICBpZiAob3B0aW9ucy5ib2R5KSB7XG4gICAgcmVxLnNlbmQob3B0aW9ucy5ib2R5KVxuICB9XG4gIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgIHJlcS53aXRoQ3JlZGVudGlhbHMoKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXEuZW5kKGNyZWF0ZVJlc3BvbnNlSGFuZGxlcih7XG4gICAgICBvcHRpb25zLFxuICAgICAgZGlzcGF0Y2gsXG4gICAgICByZWplY3QsXG4gICAgICByZXNvbHZlXG4gICAgfSkpXG4gIH0pXG59XG4iXX0=