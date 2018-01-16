'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _combineUrl = require('./combineUrl');

var _combineUrl2 = _interopRequireDefault(_combineUrl);

var _eventHandlers = require('./eventHandlers');

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tryParse = function tryParse(_ref) {
  var data = _ref.data,
      options = _ref.options,
      dispatch = _ref.dispatch;

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

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
    var options = _ref3.options,
        dispatch = _ref3.dispatch;
    var finalUrl, src;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            finalUrl = (0, _combineUrl2.default)(options.endpoint, options.query);
            src = new EventSource(finalUrl, { withCredentials: options.withCredentials });

            // wire up listeners n shiz

            (0, _keys2.default)(_eventHandlers2.default).forEach(function (eventName) {
              var handler = _eventHandlers2.default[eventName];
              src.addEventListener(eventName, function (_ref4) {
                var data = _ref4.data;

                var parsed = data && tryParse({ options: options, dispatch: dispatch, data: data });
                if (data && typeof parsed === 'undefined') return;
                handler({ options: options, dispatch: dispatch, data: parsed });
              }, false);
            });

          case 3:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlRXZlbnRTb3VyY2UuanMiXSwibmFtZXMiOlsidHJ5UGFyc2UiLCJkYXRhIiwib3B0aW9ucyIsImRpc3BhdGNoIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwidHlwZSIsIm1ldGEiLCJwYXlsb2FkIiwiZmluYWxVcmwiLCJlbmRwb2ludCIsInF1ZXJ5Iiwic3JjIiwiRXZlbnRTb3VyY2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxPQUFpQztBQUFBLE1BQTlCQyxJQUE4QixRQUE5QkEsSUFBOEI7QUFBQSxNQUF4QkMsT0FBd0IsUUFBeEJBLE9BQXdCO0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlOztBQUNoRCxNQUFJO0FBQ0YsV0FBT0MsS0FBS0MsS0FBTCxDQUFXSixJQUFYLENBQVA7QUFDRCxHQUZELENBRUUsT0FBT0ssR0FBUCxFQUFZO0FBQ1pILGFBQVM7QUFDUEksWUFBTSxlQURDO0FBRVBDLFlBQU1OLE9BRkM7QUFHUE8sZUFBU0g7QUFIRixLQUFUO0FBS0Q7QUFDRixDQVZEOzs7dUZBWWU7QUFBQSxRQUFTSixPQUFULFNBQVNBLE9BQVQ7QUFBQSxRQUFrQkMsUUFBbEIsU0FBa0JBLFFBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQTyxvQkFETyxHQUNJLDBCQUFXUixRQUFRUyxRQUFuQixFQUE2QlQsUUFBUVUsS0FBckMsQ0FESjtBQUVQQyxlQUZPLEdBRUQsSUFBSUMsV0FBSixDQUFnQkosUUFBaEIsRUFBMEIsRUFBRUssaUJBQWlCYixRQUFRYSxlQUEzQixFQUExQixDQUZDOztBQUliOztBQUNBLHlEQUFzQkMsT0FBdEIsQ0FBOEIsVUFBQ0MsU0FBRCxFQUFlO0FBQzNDLGtCQUFNQyxVQUFVLHdCQUFTRCxTQUFULENBQWhCO0FBQ0FKLGtCQUFJTSxnQkFBSixDQUFxQkYsU0FBckIsRUFBZ0MsaUJBQWM7QUFBQSxvQkFBWGhCLElBQVcsU0FBWEEsSUFBVzs7QUFDNUMsb0JBQU1tQixTQUFTbkIsUUFBUUQsU0FBUyxFQUFFRSxnQkFBRixFQUFXQyxrQkFBWCxFQUFxQkYsVUFBckIsRUFBVCxDQUF2QjtBQUNBLG9CQUFJQSxRQUFRLE9BQU9tQixNQUFQLEtBQWtCLFdBQTlCLEVBQTJDO0FBQzNDRix3QkFBUSxFQUFFaEIsZ0JBQUYsRUFBV0Msa0JBQVgsRUFBcUJGLE1BQU1tQixNQUEzQixFQUFSO0FBQ0QsZUFKRCxFQUlHLEtBSkg7QUFLRCxhQVBEOztBQUxhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoiY3JlYXRlRXZlbnRTb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29tYmluZVVybCBmcm9tICcuL2NvbWJpbmVVcmwnXG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9ldmVudEhhbmRsZXJzJ1xuXG5jb25zdCB0cnlQYXJzZSA9ICh7IGRhdGEsIG9wdGlvbnMsIGRpc3BhdGNoIH0pID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAndGFob2UuZmFpbHVyZScsXG4gICAgICBtZXRhOiBvcHRpb25zLFxuICAgICAgcGF5bG9hZDogZXJyXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoeyBvcHRpb25zLCBkaXNwYXRjaCB9KSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gY29tYmluZVVybChvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnF1ZXJ5KVxuICBjb25zdCBzcmMgPSBuZXcgRXZlbnRTb3VyY2UoZmluYWxVcmwsIHsgd2l0aENyZWRlbnRpYWxzOiBvcHRpb25zLndpdGhDcmVkZW50aWFscyB9KVxuXG4gIC8vIHdpcmUgdXAgbGlzdGVuZXJzIG4gc2hpelxuICBPYmplY3Qua2V5cyhoYW5kbGVycykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2V2ZW50TmFtZV1cbiAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsICh7IGRhdGEgfSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gZGF0YSAmJiB0cnlQYXJzZSh7IG9wdGlvbnMsIGRpc3BhdGNoLCBkYXRhIH0pXG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgcGFyc2VkID09PSAndW5kZWZpbmVkJykgcmV0dXJuXG4gICAgICBoYW5kbGVyKHsgb3B0aW9ucywgZGlzcGF0Y2gsIGRhdGE6IHBhcnNlZCB9KVxuICAgIH0sIGZhbHNlKVxuICB9KVxufVxuIl19