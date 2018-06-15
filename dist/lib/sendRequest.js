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
      if (options.onGlobalError) options.onGlobalError(err, res);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwicmVqZWN0IiwicmVzb2x2ZSIsImRlYnVnIiwibWV0aG9kIiwidG9VcHBlckNhc2UiLCJlbmRwb2ludCIsImVyciIsInJlcyIsIkVycm9yIiwidHlwZSIsIm1ldGEiLCJwYXlsb2FkIiwib25HbG9iYWxFcnJvciIsIm9uRXJyb3IiLCJyYXciLCJib2R5IiwidGV4dCIsIm9uUmVzcG9uc2UiLCJ0YWlsIiwicmVxIiwicmVxdWVzdCIsInRvTG93ZXJDYXNlIiwiaGVhZGVycyIsInNldCIsInF1ZXJ5IiwicXMiLCJzdHJpbmdpZnkiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJzZW5kIiwid2l0aENyZWRlbnRpYWxzIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHdCQUF3QixTQUF4QkEscUJBQXdCLE9BQTRDO0FBQUEsTUFBekNDLE9BQXlDLFFBQXpDQSxPQUF5QztBQUFBLE1BQWhDQyxRQUFnQyxRQUFoQ0EsUUFBZ0M7QUFBQSxNQUF0QkMsTUFBc0IsUUFBdEJBLE1BQXNCO0FBQUEsTUFBZEMsT0FBYyxRQUFkQSxPQUFjOztBQUN4RSxNQUFNQyxRQUFXSixRQUFRSyxNQUFSLENBQWVDLFdBQWYsRUFBWCxTQUEyQ04sUUFBUU8sUUFBekQ7QUFDQSxTQUFPLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25CLFFBQUksQ0FBQ0EsR0FBRCxJQUFRLENBQUNELEdBQWIsRUFBa0I7QUFDaEJBLFlBQU0sSUFBSUUsS0FBSix5QkFBZ0NOLEtBQWhDLENBQU47QUFDRDtBQUNELFFBQUlJLEdBQUosRUFBUztBQUNQQSxVQUFJQyxHQUFKLEdBQVVBLEdBQVY7QUFDQVIsZUFBUztBQUNQVSxjQUFNLGVBREM7QUFFUEMsY0FBTVosT0FGQztBQUdQYSxpQkFBU0w7QUFIRixPQUFUO0FBS0EsVUFBSVIsUUFBUWMsYUFBWixFQUEyQmQsUUFBUWMsYUFBUixDQUFzQk4sR0FBdEIsRUFBMkJDLEdBQTNCO0FBQzNCLFVBQUlULFFBQVFlLE9BQVosRUFBcUJmLFFBQVFlLE9BQVIsQ0FBZ0JQLEdBQWhCLEVBQXFCQyxHQUFyQjtBQUNyQixhQUFPUCxPQUFPTSxHQUFQLENBQVA7QUFDRDs7QUFFRDtBQUNBUCxhQUFTO0FBQ1BVLFlBQU0sZUFEQztBQUVQQyxZQUFNWixPQUZDO0FBR1BhLGVBQVM7QUFDUEcsYUFBS1AsSUFBSVEsSUFERjtBQUVQQyxjQUFNVCxJQUFJUztBQUZIO0FBSEYsS0FBVDtBQVFBLFFBQUlsQixRQUFRbUIsVUFBWixFQUF3Qm5CLFFBQVFtQixVQUFSLENBQW1CVixHQUFuQjtBQUN4Qk4sWUFBUU0sR0FBUjtBQUNELEdBM0JEO0FBNEJELENBOUJEOzs7dUZBZ0NlO0FBQUEsUUFBU1QsT0FBVCxTQUFTQSxPQUFUO0FBQUEsUUFBa0JDLFFBQWxCLFNBQWtCQSxRQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDYkEscUJBQVM7QUFDUFUsb0JBQU0sZUFEQztBQUVQRSx1QkFBU2I7QUFGRixhQUFUOztBQURhLGlCQU1UQSxRQUFRb0IsSUFOQztBQUFBO0FBQUE7QUFBQTs7QUFBQSw2Q0FPSixpQ0FBa0IsRUFBRXBCLGdCQUFGLEVBQVdDLGtCQUFYLEVBQWxCLENBUEk7O0FBQUE7QUFVUG9CLGVBVk8sR0FVREMscUJBQVF0QixRQUFRSyxNQUFSLENBQWVrQixXQUFmLEVBQVIsRUFBc0N2QixRQUFRTyxRQUE5QyxDQVZDOztBQVdiLGdCQUFJUCxRQUFRd0IsT0FBWixFQUFxQjtBQUNuQkgsa0JBQUlJLEdBQUosQ0FBUXpCLFFBQVF3QixPQUFoQjtBQUNEO0FBQ0QsZ0JBQUl4QixRQUFRMEIsS0FBWixFQUFtQjtBQUNqQkwsa0JBQUlLLEtBQUosQ0FBVSxPQUFPMUIsUUFBUTBCLEtBQWYsS0FBeUIsUUFBekIsR0FDTjFCLFFBQVEwQixLQURGLEdBRU5DLGFBQUdDLFNBQUgsQ0FBYTVCLFFBQVEwQixLQUFyQixFQUE0QixFQUFFRyxvQkFBb0IsSUFBdEIsRUFBNUIsQ0FGSjtBQUdEO0FBQ0QsZ0JBQUk3QixRQUFRaUIsSUFBWixFQUFrQjtBQUNoQkksa0JBQUlTLElBQUosQ0FBUzlCLFFBQVFpQixJQUFqQjtBQUNEO0FBQ0QsZ0JBQUlqQixRQUFRK0IsZUFBWixFQUE2QjtBQUMzQlYsa0JBQUlVLGVBQUo7QUFDRDs7QUF4QlksNkNBMEJOLHNCQUFZLFVBQUM1QixPQUFELEVBQVVELE1BQVYsRUFBcUI7QUFDdENtQixrQkFBSVcsR0FBSixDQUFRakMsc0JBQXNCO0FBQzVCQyxnQ0FENEI7QUFFNUJDLGtDQUY0QjtBQUc1QkMsOEJBSDRCO0FBSTVCQztBQUo0QixlQUF0QixDQUFSO0FBTUQsYUFQTSxDQTFCTTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwiZmlsZSI6InNlbmRSZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSAnc3VwZXJhZ2VudCdcbmltcG9ydCBjcmVhdGVFdmVudFNvdXJjZSBmcm9tICcuL2NyZWF0ZUV2ZW50U291cmNlJ1xuaW1wb3J0IHFzIGZyb20gJ3FzJ1xuXG5jb25zdCBjcmVhdGVSZXNwb25zZUhhbmRsZXIgPSAoeyBvcHRpb25zLCBkaXNwYXRjaCwgcmVqZWN0LCByZXNvbHZlIH0pID0+IHtcbiAgY29uc3QgZGVidWcgPSBgJHtvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke29wdGlvbnMuZW5kcG9pbnR9YFxuICByZXR1cm4gKGVyciwgcmVzKSA9PiB7XG4gICAgaWYgKCFyZXMgJiYgIWVycikge1xuICAgICAgZXJyID0gbmV3IEVycm9yKGBDb25uZWN0aW9uIGZhaWxlZDogJHtkZWJ1Z31gKVxuICAgIH1cbiAgICBpZiAoZXJyKSB7XG4gICAgICBlcnIucmVzID0gcmVzXG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICd0YWhvZS5mYWlsdXJlJyxcbiAgICAgICAgbWV0YTogb3B0aW9ucyxcbiAgICAgICAgcGF5bG9hZDogZXJyXG4gICAgICB9KVxuICAgICAgaWYgKG9wdGlvbnMub25HbG9iYWxFcnJvcikgb3B0aW9ucy5vbkdsb2JhbEVycm9yKGVyciwgcmVzKVxuICAgICAgaWYgKG9wdGlvbnMub25FcnJvcikgb3B0aW9ucy5vbkVycm9yKGVyciwgcmVzKVxuICAgICAgcmV0dXJuIHJlamVjdChlcnIpXG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGpzb24gcmVzcG9uc2VzXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ3RhaG9lLnN1Y2Nlc3MnLFxuICAgICAgbWV0YTogb3B0aW9ucyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcmF3OiByZXMuYm9keSxcbiAgICAgICAgdGV4dDogcmVzLnRleHRcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChvcHRpb25zLm9uUmVzcG9uc2UpIG9wdGlvbnMub25SZXNwb25zZShyZXMpXG4gICAgcmVzb2x2ZShyZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogJ3RhaG9lLnJlcXVlc3QnLFxuICAgIHBheWxvYWQ6IG9wdGlvbnNcbiAgfSlcblxuICBpZiAob3B0aW9ucy50YWlsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUV2ZW50U291cmNlKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSlcbiAgfVxuXG4gIGNvbnN0IHJlcSA9IHJlcXVlc3Rbb3B0aW9ucy5tZXRob2QudG9Mb3dlckNhc2UoKV0ob3B0aW9ucy5lbmRwb2ludClcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIHJlcS5zZXQob3B0aW9ucy5oZWFkZXJzKVxuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5KSB7XG4gICAgcmVxLnF1ZXJ5KHR5cGVvZiBvcHRpb25zLnF1ZXJ5ID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHRpb25zLnF1ZXJ5XG4gICAgICA6IHFzLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5LCB7IHN0cmljdE51bGxIYW5kbGluZzogdHJ1ZSB9KSlcbiAgfVxuICBpZiAob3B0aW9ucy5ib2R5KSB7XG4gICAgcmVxLnNlbmQob3B0aW9ucy5ib2R5KVxuICB9XG4gIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgIHJlcS53aXRoQ3JlZGVudGlhbHMoKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXEuZW5kKGNyZWF0ZVJlc3BvbnNlSGFuZGxlcih7XG4gICAgICBvcHRpb25zLFxuICAgICAgZGlzcGF0Y2gsXG4gICAgICByZWplY3QsXG4gICAgICByZXNvbHZlXG4gICAgfSkpXG4gIH0pXG59XG4iXX0=