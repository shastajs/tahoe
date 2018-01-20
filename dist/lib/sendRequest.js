'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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
      dispatch = _ref.dispatch;

  var debug = options.method.toUpperCase() + ' ' + options.endpoint;
  return function (err, res) {
    if (!res && !err) {
      err = new Error('Connection failed: ' + debug);
    }
    if (!err && res.type !== 'application/json') {
      err = new Error('Unknown response type: \'' + res.type + '\' from ' + debug);
    }
    if (err) {
      err.res = res;
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      });
      if (options.onError) options.onError(err, res);
      return;
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

            req.end(createResponseHandler({ options: options, dispatch: dispatch }));

            return _context.abrupt('return', req);

          case 10:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwiZGVidWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImVuZHBvaW50IiwiZXJyIiwicmVzIiwiRXJyb3IiLCJ0eXBlIiwibWV0YSIsInBheWxvYWQiLCJvbkVycm9yIiwicmF3IiwiYm9keSIsIm9uUmVzcG9uc2UiLCJ0YWlsIiwicmVxIiwidG9Mb3dlckNhc2UiLCJoZWFkZXJzIiwic2V0IiwicXVlcnkiLCJzdHJpbmdpZnkiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJzZW5kIiwid2l0aENyZWRlbnRpYWxzIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsd0JBQXdCLFNBQXhCQSxxQkFBd0IsT0FBMkI7QUFBQSxNQUF4QkMsT0FBd0IsUUFBeEJBLE9BQXdCO0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlOztBQUN2RCxNQUFNQyxRQUFXRixRQUFRRyxNQUFSLENBQWVDLFdBQWYsRUFBWCxTQUEyQ0osUUFBUUssUUFBekQ7QUFDQSxTQUFPLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25CLFFBQUksQ0FBQ0EsR0FBRCxJQUFRLENBQUNELEdBQWIsRUFBa0I7QUFDaEJBLFlBQU0sSUFBSUUsS0FBSix5QkFBZ0NOLEtBQWhDLENBQU47QUFDRDtBQUNELFFBQUksQ0FBQ0ksR0FBRCxJQUFRQyxJQUFJRSxJQUFKLEtBQWEsa0JBQXpCLEVBQTZDO0FBQzNDSCxZQUFNLElBQUlFLEtBQUosK0JBQXFDRCxJQUFJRSxJQUF6QyxnQkFBdURQLEtBQXZELENBQU47QUFDRDtBQUNELFFBQUlJLEdBQUosRUFBUztBQUNQQSxVQUFJQyxHQUFKLEdBQVVBLEdBQVY7QUFDQU4sZUFBUztBQUNQUSxjQUFNLGVBREM7QUFFUEMsY0FBTVYsT0FGQztBQUdQVyxpQkFBU0w7QUFIRixPQUFUO0FBS0EsVUFBSU4sUUFBUVksT0FBWixFQUFxQlosUUFBUVksT0FBUixDQUFnQk4sR0FBaEIsRUFBcUJDLEdBQXJCO0FBQ3JCO0FBQ0Q7O0FBRUQ7QUFDQU4sYUFBUztBQUNQUSxZQUFNLGVBREM7QUFFUEMsWUFBTVYsT0FGQztBQUdQVyxlQUFTO0FBQ1BFLGFBQUtOLElBQUlPO0FBREY7QUFIRixLQUFUO0FBT0EsUUFBSWQsUUFBUWUsVUFBWixFQUF3QmYsUUFBUWUsVUFBUixDQUFtQlIsR0FBbkI7QUFDekIsR0EzQkQ7QUE0QkQsQ0E5QkQ7Ozt1RkFnQ2U7QUFBQSxRQUFTUCxPQUFULFNBQVNBLE9BQVQ7QUFBQSxRQUFrQkMsUUFBbEIsU0FBa0JBLFFBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNiQSxxQkFBUztBQUNQUSxvQkFBTSxlQURDO0FBRVBFLHVCQUFTWDtBQUZGLGFBQVQ7O0FBRGEsaUJBTVRBLFFBQVFnQixJQU5DO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZDQU9KLGlDQUFrQixFQUFFaEIsZ0JBQUYsRUFBV0Msa0JBQVgsRUFBbEIsQ0FQSTs7QUFBQTtBQVVQZ0IsZUFWTyxHQVVELHFCQUFRakIsUUFBUUcsTUFBUixDQUFlZSxXQUFmLEVBQVIsRUFBc0NsQixRQUFRSyxRQUE5QyxDQVZDOztBQVdiLGdCQUFJTCxRQUFRbUIsT0FBWixFQUFxQjtBQUNuQkYsa0JBQUlHLEdBQUosQ0FBUXBCLFFBQVFtQixPQUFoQjtBQUNEO0FBQ0QsZ0JBQUluQixRQUFRcUIsS0FBWixFQUFtQjtBQUNqQkosa0JBQUlJLEtBQUosQ0FBVSxPQUFPckIsUUFBUXFCLEtBQWYsS0FBeUIsUUFBekIsR0FDTnJCLFFBQVFxQixLQURGLEdBRU4sYUFBR0MsU0FBSCxDQUFhdEIsUUFBUXFCLEtBQXJCLEVBQTRCLEVBQUVFLG9CQUFvQixJQUF0QixFQUE1QixDQUZKO0FBR0Q7QUFDRCxnQkFBSXZCLFFBQVFjLElBQVosRUFBa0I7QUFDaEJHLGtCQUFJTyxJQUFKLENBQVN4QixRQUFRYyxJQUFqQjtBQUNEO0FBQ0QsZ0JBQUlkLFFBQVF5QixlQUFaLEVBQTZCO0FBQzNCUixrQkFBSVEsZUFBSjtBQUNEOztBQUVEUixnQkFBSVMsR0FBSixDQUFRM0Isc0JBQXNCLEVBQUVDLGdCQUFGLEVBQVdDLGtCQUFYLEVBQXRCLENBQVI7O0FBMUJhLDZDQTRCTmdCLEdBNUJNOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoic2VuZFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50J1xuaW1wb3J0IGNyZWF0ZUV2ZW50U291cmNlIGZyb20gJy4vY3JlYXRlRXZlbnRTb3VyY2UnXG5pbXBvcnQgcXMgZnJvbSAncXMnXG5cbmNvbnN0IGNyZWF0ZVJlc3BvbnNlSGFuZGxlciA9ICh7IG9wdGlvbnMsIGRpc3BhdGNoIH0pID0+IHtcbiAgY29uc3QgZGVidWcgPSBgJHtvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke29wdGlvbnMuZW5kcG9pbnR9YFxuICByZXR1cm4gKGVyciwgcmVzKSA9PiB7XG4gICAgaWYgKCFyZXMgJiYgIWVycikge1xuICAgICAgZXJyID0gbmV3IEVycm9yKGBDb25uZWN0aW9uIGZhaWxlZDogJHtkZWJ1Z31gKVxuICAgIH1cbiAgICBpZiAoIWVyciAmJiByZXMudHlwZSAhPT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoYFVua25vd24gcmVzcG9uc2UgdHlwZTogJyR7cmVzLnR5cGV9JyBmcm9tICR7ZGVidWd9YClcbiAgICB9XG4gICAgaWYgKGVycikge1xuICAgICAgZXJyLnJlcyA9IHJlc1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAndGFob2UuZmFpbHVyZScsXG4gICAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICAgIHBheWxvYWQ6IGVyclxuICAgICAgfSlcbiAgICAgIGlmIChvcHRpb25zLm9uRXJyb3IpIG9wdGlvbnMub25FcnJvcihlcnIsIHJlcylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGhhbmRsZSBqc29uIHJlc3BvbnNlc1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICd0YWhvZS5zdWNjZXNzJyxcbiAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHJhdzogcmVzLmJvZHlcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChvcHRpb25zLm9uUmVzcG9uc2UpIG9wdGlvbnMub25SZXNwb25zZShyZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogJ3RhaG9lLnJlcXVlc3QnLFxuICAgIHBheWxvYWQ6IG9wdGlvbnNcbiAgfSlcblxuICBpZiAob3B0aW9ucy50YWlsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUV2ZW50U291cmNlKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSlcbiAgfVxuXG4gIGNvbnN0IHJlcSA9IHJlcXVlc3Rbb3B0aW9ucy5tZXRob2QudG9Mb3dlckNhc2UoKV0ob3B0aW9ucy5lbmRwb2ludClcbiAgaWYgKG9wdGlvbnMuaGVhZGVycykge1xuICAgIHJlcS5zZXQob3B0aW9ucy5oZWFkZXJzKVxuICB9XG4gIGlmIChvcHRpb25zLnF1ZXJ5KSB7XG4gICAgcmVxLnF1ZXJ5KHR5cGVvZiBvcHRpb25zLnF1ZXJ5ID09PSAnc3RyaW5nJ1xuICAgICAgPyBvcHRpb25zLnF1ZXJ5XG4gICAgICA6IHFzLnN0cmluZ2lmeShvcHRpb25zLnF1ZXJ5LCB7IHN0cmljdE51bGxIYW5kbGluZzogdHJ1ZSB9KSlcbiAgfVxuICBpZiAob3B0aW9ucy5ib2R5KSB7XG4gICAgcmVxLnNlbmQob3B0aW9ucy5ib2R5KVxuICB9XG4gIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgIHJlcS53aXRoQ3JlZGVudGlhbHMoKVxuICB9XG5cbiAgcmVxLmVuZChjcmVhdGVSZXNwb25zZUhhbmRsZXIoeyBvcHRpb25zLCBkaXNwYXRjaCB9KSlcblxuICByZXR1cm4gcmVxXG59XG4iXX0=