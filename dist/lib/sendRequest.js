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
        raw: res.body,
        text: res.text
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwicmVqZWN0IiwicmVzb2x2ZSIsImRlYnVnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJlbmRwb2ludCIsImVyciIsInJlcyIsIkVycm9yIiwidHlwZSIsIm1ldGEiLCJwYXlsb2FkIiwib25FcnJvciIsInJhdyIsImJvZHkiLCJ0ZXh0Iiwib25SZXNwb25zZSIsInRhaWwiLCJyZXEiLCJ0b0xvd2VyQ2FzZSIsImhlYWRlcnMiLCJzZXQiLCJxdWVyeSIsInN0cmluZ2lmeSIsInN0cmljdE51bGxIYW5kbGluZyIsInNlbmQiLCJ3aXRoQ3JlZGVudGlhbHMiLCJlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsd0JBQXdCLFNBQXhCQSxxQkFBd0IsT0FBNEM7QUFBQSxNQUF6Q0MsT0FBeUMsUUFBekNBLE9BQXlDO0FBQUEsTUFBaENDLFFBQWdDLFFBQWhDQSxRQUFnQztBQUFBLE1BQXRCQyxNQUFzQixRQUF0QkEsTUFBc0I7QUFBQSxNQUFkQyxPQUFjLFFBQWRBLE9BQWM7O0FBQ3hFLE1BQU1DLFFBQVdKLFFBQVFLLE1BQVIsQ0FBZUMsV0FBZixFQUFYLFNBQTJDTixRQUFRTyxRQUF6RDtBQUNBLFNBQU8sVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDbkIsUUFBSSxDQUFDQSxHQUFELElBQVEsQ0FBQ0QsR0FBYixFQUFrQjtBQUNoQkEsWUFBTSxJQUFJRSxLQUFKLHlCQUFnQ04sS0FBaEMsQ0FBTjtBQUNEO0FBQ0QsUUFBSUksR0FBSixFQUFTO0FBQ1BBLFVBQUlDLEdBQUosR0FBVUEsR0FBVjtBQUNBUixlQUFTO0FBQ1BVLGNBQU0sZUFEQztBQUVQQyxjQUFNWixPQUZDO0FBR1BhLGlCQUFTTDtBQUhGLE9BQVQ7QUFLQSxVQUFJUixRQUFRYyxPQUFaLEVBQXFCZCxRQUFRYyxPQUFSLENBQWdCTixHQUFoQixFQUFxQkMsR0FBckI7QUFDckIsYUFBT1AsT0FBT00sR0FBUCxDQUFQO0FBQ0Q7O0FBRUQ7QUFDQVAsYUFBUztBQUNQVSxZQUFNLGVBREM7QUFFUEMsWUFBTVosT0FGQztBQUdQYSxlQUFTO0FBQ1BFLGFBQUtOLElBQUlPLElBREY7QUFFUEMsY0FBTVIsSUFBSVE7QUFGSDtBQUhGLEtBQVQ7QUFRQSxRQUFJakIsUUFBUWtCLFVBQVosRUFBd0JsQixRQUFRa0IsVUFBUixDQUFtQlQsR0FBbkI7QUFDeEJOLFlBQVFNLEdBQVI7QUFDRCxHQTFCRDtBQTJCRCxDQTdCRDs7O3VGQStCZTtBQUFBLFFBQVNULE9BQVQsU0FBU0EsT0FBVDtBQUFBLFFBQWtCQyxRQUFsQixTQUFrQkEsUUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JBLHFCQUFTO0FBQ1BVLG9CQUFNLGVBREM7QUFFUEUsdUJBQVNiO0FBRkYsYUFBVDs7QUFEYSxpQkFNVEEsUUFBUW1CLElBTkM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkNBT0osaUNBQWtCLEVBQUVuQixnQkFBRixFQUFXQyxrQkFBWCxFQUFsQixDQVBJOztBQUFBO0FBVVBtQixlQVZPLEdBVUQscUJBQVFwQixRQUFRSyxNQUFSLENBQWVnQixXQUFmLEVBQVIsRUFBc0NyQixRQUFRTyxRQUE5QyxDQVZDOztBQVdiLGdCQUFJUCxRQUFRc0IsT0FBWixFQUFxQjtBQUNuQkYsa0JBQUlHLEdBQUosQ0FBUXZCLFFBQVFzQixPQUFoQjtBQUNEO0FBQ0QsZ0JBQUl0QixRQUFRd0IsS0FBWixFQUFtQjtBQUNqQkosa0JBQUlJLEtBQUosQ0FBVSxPQUFPeEIsUUFBUXdCLEtBQWYsS0FBeUIsUUFBekIsR0FDTnhCLFFBQVF3QixLQURGLEdBRU4sYUFBR0MsU0FBSCxDQUFhekIsUUFBUXdCLEtBQXJCLEVBQTRCLEVBQUVFLG9CQUFvQixJQUF0QixFQUE1QixDQUZKO0FBR0Q7QUFDRCxnQkFBSTFCLFFBQVFnQixJQUFaLEVBQWtCO0FBQ2hCSSxrQkFBSU8sSUFBSixDQUFTM0IsUUFBUWdCLElBQWpCO0FBQ0Q7QUFDRCxnQkFBSWhCLFFBQVE0QixlQUFaLEVBQTZCO0FBQzNCUixrQkFBSVEsZUFBSjtBQUNEOztBQXhCWSw2Q0EwQk4sc0JBQVksVUFBQ3pCLE9BQUQsRUFBVUQsTUFBVixFQUFxQjtBQUN0Q2tCLGtCQUFJUyxHQUFKLENBQVE5QixzQkFBc0I7QUFDNUJDLGdDQUQ0QjtBQUU1QkMsa0NBRjRCO0FBRzVCQyw4QkFINEI7QUFJNUJDO0FBSjRCLGVBQXRCLENBQVI7QUFNRCxhQVBNLENBMUJNOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoic2VuZFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50J1xuaW1wb3J0IGNyZWF0ZUV2ZW50U291cmNlIGZyb20gJy4vY3JlYXRlRXZlbnRTb3VyY2UnXG5pbXBvcnQgcXMgZnJvbSAncXMnXG5cbmNvbnN0IGNyZWF0ZVJlc3BvbnNlSGFuZGxlciA9ICh7IG9wdGlvbnMsIGRpc3BhdGNoLCByZWplY3QsIHJlc29sdmUgfSkgPT4ge1xuICBjb25zdCBkZWJ1ZyA9IGAke29wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7b3B0aW9ucy5lbmRwb2ludH1gXG4gIHJldHVybiAoZXJyLCByZXMpID0+IHtcbiAgICBpZiAoIXJlcyAmJiAhZXJyKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoYENvbm5lY3Rpb24gZmFpbGVkOiAke2RlYnVnfWApXG4gICAgfVxuICAgIGlmIChlcnIpIHtcbiAgICAgIGVyci5yZXMgPSByZXNcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ3RhaG9lLmZhaWx1cmUnLFxuICAgICAgICBtZXRhOiBvcHRpb25zLFxuICAgICAgICBwYXlsb2FkOiBlcnJcbiAgICAgIH0pXG4gICAgICBpZiAob3B0aW9ucy5vbkVycm9yKSBvcHRpb25zLm9uRXJyb3IoZXJyLCByZXMpXG4gICAgICByZXR1cm4gcmVqZWN0KGVycilcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUganNvbiByZXNwb25zZXNcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAndGFob2Uuc3VjY2VzcycsXG4gICAgICBtZXRhOiBvcHRpb25zLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICByYXc6IHJlcy5ib2R5LFxuICAgICAgICB0ZXh0OiByZXMudGV4dFxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG9wdGlvbnMub25SZXNwb25zZSkgb3B0aW9ucy5vblJlc3BvbnNlKHJlcylcbiAgICByZXNvbHZlKHJlcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBvcHRpb25zLCBkaXNwYXRjaCB9KSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAndGFob2UucmVxdWVzdCcsXG4gICAgcGF5bG9hZDogb3B0aW9uc1xuICB9KVxuXG4gIGlmIChvcHRpb25zLnRhaWwpIHtcbiAgICByZXR1cm4gY3JlYXRlRXZlbnRTb3VyY2UoeyBvcHRpb25zLCBkaXNwYXRjaCB9KVxuICB9XG5cbiAgY29uc3QgcmVxID0gcmVxdWVzdFtvcHRpb25zLm1ldGhvZC50b0xvd2VyQ2FzZSgpXShvcHRpb25zLmVuZHBvaW50KVxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgcmVxLnNldChvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgaWYgKG9wdGlvbnMucXVlcnkpIHtcbiAgICByZXEucXVlcnkodHlwZW9mIG9wdGlvbnMucXVlcnkgPT09ICdzdHJpbmcnXG4gICAgICA/IG9wdGlvbnMucXVlcnlcbiAgICAgIDogcXMuc3RyaW5naWZ5KG9wdGlvbnMucXVlcnksIHsgc3RyaWN0TnVsbEhhbmRsaW5nOiB0cnVlIH0pKVxuICB9XG4gIGlmIChvcHRpb25zLmJvZHkpIHtcbiAgICByZXEuc2VuZChvcHRpb25zLmJvZHkpXG4gIH1cbiAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgcmVxLndpdGhDcmVkZW50aWFscygpXG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcS5lbmQoY3JlYXRlUmVzcG9uc2VIYW5kbGVyKHtcbiAgICAgIG9wdGlvbnMsXG4gICAgICBkaXNwYXRjaCxcbiAgICAgIHJlamVjdCxcbiAgICAgIHJlc29sdmVcbiAgICB9KSlcbiAgfSlcbn1cbiJdfQ==