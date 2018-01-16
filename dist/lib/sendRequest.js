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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwiZGVidWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImVuZHBvaW50IiwiZXJyIiwicmVzIiwiRXJyb3IiLCJ0eXBlIiwibWV0YSIsInBheWxvYWQiLCJvbkVycm9yIiwicmF3IiwiYm9keSIsIm9uUmVzcG9uc2UiLCJ0YWlsIiwicmVxIiwidG9Mb3dlckNhc2UiLCJoZWFkZXJzIiwic2V0IiwicXVlcnkiLCJzdHJpbmdpZnkiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJzZW5kIiwid2l0aENyZWRlbnRpYWxzIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsd0JBQXdCLFNBQXhCQSxxQkFBd0IsT0FBMkI7QUFBQSxNQUF4QkMsT0FBd0IsUUFBeEJBLE9BQXdCO0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlOztBQUN2RCxNQUFNQyxRQUFXRixRQUFRRyxNQUFSLENBQWVDLFdBQWYsRUFBWCxTQUEyQ0osUUFBUUssUUFBekQ7QUFDQSxTQUFPLFVBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ25CLFFBQUksQ0FBQ0EsR0FBRCxJQUFRLENBQUNELEdBQWIsRUFBa0I7QUFDaEJBLFlBQU0sSUFBSUUsS0FBSix5QkFBZ0NOLEtBQWhDLENBQU47QUFDRDtBQUNELFFBQUksQ0FBQ0ksR0FBRCxJQUFRQyxJQUFJRSxJQUFKLEtBQWEsa0JBQXpCLEVBQTZDO0FBQzNDSCxZQUFNLElBQUlFLEtBQUosK0JBQXFDRCxJQUFJRSxJQUF6QyxnQkFBdURQLEtBQXZELENBQU47QUFDRDtBQUNELFFBQUlJLEdBQUosRUFBUztBQUNQTCxlQUFTO0FBQ1BRLGNBQU0sZUFEQztBQUVQQyxjQUFNVixPQUZDO0FBR1BXLGlCQUFTTDtBQUhGLE9BQVQ7QUFLQSxVQUFJTixRQUFRWSxPQUFaLEVBQXFCWixRQUFRWSxPQUFSLENBQWdCTixHQUFoQixFQUFxQkMsR0FBckI7QUFDckI7QUFDRDs7QUFFRDtBQUNBTixhQUFTO0FBQ1BRLFlBQU0sZUFEQztBQUVQQyxZQUFNVixPQUZDO0FBR1BXLGVBQVM7QUFDUEUsYUFBS04sSUFBSU87QUFERjtBQUhGLEtBQVQ7QUFPQSxRQUFJZCxRQUFRZSxVQUFaLEVBQXdCZixRQUFRZSxVQUFSLENBQW1CUixHQUFuQjtBQUN6QixHQTFCRDtBQTJCRCxDQTdCRDs7O3VGQStCZTtBQUFBLFFBQVNQLE9BQVQsU0FBU0EsT0FBVDtBQUFBLFFBQWtCQyxRQUFsQixTQUFrQkEsUUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2JBLHFCQUFTO0FBQ1BRLG9CQUFNLGVBREM7QUFFUEUsdUJBQVNYO0FBRkYsYUFBVDs7QUFEYSxpQkFNVEEsUUFBUWdCLElBTkM7QUFBQTtBQUFBO0FBQUE7O0FBQUEsNkNBT0osaUNBQWtCLEVBQUVoQixnQkFBRixFQUFXQyxrQkFBWCxFQUFsQixDQVBJOztBQUFBO0FBVVBnQixlQVZPLEdBVUQscUJBQVFqQixRQUFRRyxNQUFSLENBQWVlLFdBQWYsRUFBUixFQUFzQ2xCLFFBQVFLLFFBQTlDLENBVkM7O0FBV2IsZ0JBQUlMLFFBQVFtQixPQUFaLEVBQXFCO0FBQ25CRixrQkFBSUcsR0FBSixDQUFRcEIsUUFBUW1CLE9BQWhCO0FBQ0Q7QUFDRCxnQkFBSW5CLFFBQVFxQixLQUFaLEVBQW1CO0FBQ2pCSixrQkFBSUksS0FBSixDQUFVLE9BQU9yQixRQUFRcUIsS0FBZixLQUF5QixRQUF6QixHQUNOckIsUUFBUXFCLEtBREYsR0FFTixhQUFHQyxTQUFILENBQWF0QixRQUFRcUIsS0FBckIsRUFBNEIsRUFBRUUsb0JBQW9CLElBQXRCLEVBQTVCLENBRko7QUFHRDtBQUNELGdCQUFJdkIsUUFBUWMsSUFBWixFQUFrQjtBQUNoQkcsa0JBQUlPLElBQUosQ0FBU3hCLFFBQVFjLElBQWpCO0FBQ0Q7QUFDRCxnQkFBSWQsUUFBUXlCLGVBQVosRUFBNkI7QUFDM0JSLGtCQUFJUSxlQUFKO0FBQ0Q7O0FBRURSLGdCQUFJUyxHQUFKLENBQVEzQixzQkFBc0IsRUFBRUMsZ0JBQUYsRUFBV0Msa0JBQVgsRUFBdEIsQ0FBUjs7QUExQmEsNkNBNEJOZ0IsR0E1Qk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJzZW5kUmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXF1ZXN0IGZyb20gJ3N1cGVyYWdlbnQnXG5pbXBvcnQgY3JlYXRlRXZlbnRTb3VyY2UgZnJvbSAnLi9jcmVhdGVFdmVudFNvdXJjZSdcbmltcG9ydCBxcyBmcm9tICdxcydcblxuY29uc3QgY3JlYXRlUmVzcG9uc2VIYW5kbGVyID0gKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSkgPT4ge1xuICBjb25zdCBkZWJ1ZyA9IGAke29wdGlvbnMubWV0aG9kLnRvVXBwZXJDYXNlKCl9ICR7b3B0aW9ucy5lbmRwb2ludH1gXG4gIHJldHVybiAoZXJyLCByZXMpID0+IHtcbiAgICBpZiAoIXJlcyAmJiAhZXJyKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoYENvbm5lY3Rpb24gZmFpbGVkOiAke2RlYnVnfWApXG4gICAgfVxuICAgIGlmICghZXJyICYmIHJlcy50eXBlICE9PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihgVW5rbm93biByZXNwb25zZSB0eXBlOiAnJHtyZXMudHlwZX0nIGZyb20gJHtkZWJ1Z31gKVxuICAgIH1cbiAgICBpZiAoZXJyKSB7XG4gICAgICBkaXNwYXRjaCh7XG4gICAgICAgIHR5cGU6ICd0YWhvZS5mYWlsdXJlJyxcbiAgICAgICAgbWV0YTogb3B0aW9ucyxcbiAgICAgICAgcGF5bG9hZDogZXJyXG4gICAgICB9KVxuICAgICAgaWYgKG9wdGlvbnMub25FcnJvcikgb3B0aW9ucy5vbkVycm9yKGVyciwgcmVzKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGpzb24gcmVzcG9uc2VzXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ3RhaG9lLnN1Y2Nlc3MnLFxuICAgICAgbWV0YTogb3B0aW9ucyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgcmF3OiByZXMuYm9keVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKG9wdGlvbnMub25SZXNwb25zZSkgb3B0aW9ucy5vblJlc3BvbnNlKHJlcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBvcHRpb25zLCBkaXNwYXRjaCB9KSA9PiB7XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAndGFob2UucmVxdWVzdCcsXG4gICAgcGF5bG9hZDogb3B0aW9uc1xuICB9KVxuXG4gIGlmIChvcHRpb25zLnRhaWwpIHtcbiAgICByZXR1cm4gY3JlYXRlRXZlbnRTb3VyY2UoeyBvcHRpb25zLCBkaXNwYXRjaCB9KVxuICB9XG5cbiAgY29uc3QgcmVxID0gcmVxdWVzdFtvcHRpb25zLm1ldGhvZC50b0xvd2VyQ2FzZSgpXShvcHRpb25zLmVuZHBvaW50KVxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgcmVxLnNldChvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgaWYgKG9wdGlvbnMucXVlcnkpIHtcbiAgICByZXEucXVlcnkodHlwZW9mIG9wdGlvbnMucXVlcnkgPT09ICdzdHJpbmcnXG4gICAgICA/IG9wdGlvbnMucXVlcnlcbiAgICAgIDogcXMuc3RyaW5naWZ5KG9wdGlvbnMucXVlcnksIHsgc3RyaWN0TnVsbEhhbmRsaW5nOiB0cnVlIH0pKVxuICB9XG4gIGlmIChvcHRpb25zLmJvZHkpIHtcbiAgICByZXEuc2VuZChvcHRpb25zLmJvZHkpXG4gIH1cbiAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgcmVxLndpdGhDcmVkZW50aWFscygpXG4gIH1cblxuICByZXEuZW5kKGNyZWF0ZVJlc3BvbnNlSGFuZGxlcih7IG9wdGlvbnMsIGRpc3BhdGNoIH0pKVxuXG4gIHJldHVybiByZXFcbn1cbiJdfQ==