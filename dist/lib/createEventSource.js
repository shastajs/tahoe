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

exports.default = function (_ref2) {
  var options = _ref2.options,
      dispatch = _ref2.dispatch;

  var finalUrl = (0, _combineUrl2.default)(options.endpoint, options.query);
  var src = new EventSource(finalUrl, { withCredentials: options.withCredentials });

  // wire up listeners n shiz
  (0, _keys2.default)(_eventHandlers2.default).forEach(function (eventName) {
    var handler = _eventHandlers2.default[eventName];
    src.addEventListener(eventName, function (_ref3) {
      var data = _ref3.data;

      var parsed = data && tryParse({ options: options, dispatch: dispatch, data: data });
      if (data && typeof parsed === 'undefined') return;
      handler({ options: options, dispatch: dispatch, data: parsed });
    }, false);
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY3JlYXRlRXZlbnRTb3VyY2UuanMiXSwibmFtZXMiOlsidHJ5UGFyc2UiLCJkYXRhIiwib3B0aW9ucyIsImRpc3BhdGNoIiwiSlNPTiIsInBhcnNlIiwiZXJyIiwidHlwZSIsIm1ldGEiLCJwYXlsb2FkIiwiZmluYWxVcmwiLCJlbmRwb2ludCIsInF1ZXJ5Iiwic3JjIiwiRXZlbnRTb3VyY2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwiaGFuZGxlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsT0FBaUM7QUFBQSxNQUE5QkMsSUFBOEIsUUFBOUJBLElBQThCO0FBQUEsTUFBeEJDLE9BQXdCLFFBQXhCQSxPQUF3QjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTs7QUFDaEQsTUFBSTtBQUNGLFdBQU9DLEtBQUtDLEtBQUwsQ0FBV0osSUFBWCxDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9LLEdBQVAsRUFBWTtBQUNaSCxhQUFTO0FBQ1BJLFlBQU0sZUFEQztBQUVQQyxZQUFNTixPQUZDO0FBR1BPLGVBQVNIO0FBSEYsS0FBVDtBQUtEO0FBQ0YsQ0FWRDs7a0JBWWUsaUJBQTJCO0FBQUEsTUFBeEJKLE9BQXdCLFNBQXhCQSxPQUF3QjtBQUFBLE1BQWZDLFFBQWUsU0FBZkEsUUFBZTs7QUFDeEMsTUFBTU8sV0FBVywwQkFBV1IsUUFBUVMsUUFBbkIsRUFBNkJULFFBQVFVLEtBQXJDLENBQWpCO0FBQ0EsTUFBTUMsTUFBTSxJQUFJQyxXQUFKLENBQWdCSixRQUFoQixFQUEwQixFQUFFSyxpQkFBaUJiLFFBQVFhLGVBQTNCLEVBQTFCLENBQVo7O0FBRUE7QUFDQSwrQ0FBc0JDLE9BQXRCLENBQThCLFVBQUNDLFNBQUQsRUFBZTtBQUMzQyxRQUFNQyxVQUFVLHdCQUFTRCxTQUFULENBQWhCO0FBQ0FKLFFBQUlNLGdCQUFKLENBQXFCRixTQUFyQixFQUFnQyxpQkFBYztBQUFBLFVBQVhoQixJQUFXLFNBQVhBLElBQVc7O0FBQzVDLFVBQU1tQixTQUFTbkIsUUFBUUQsU0FBUyxFQUFFRSxnQkFBRixFQUFXQyxrQkFBWCxFQUFxQkYsVUFBckIsRUFBVCxDQUF2QjtBQUNBLFVBQUlBLFFBQVEsT0FBT21CLE1BQVAsS0FBa0IsV0FBOUIsRUFBMkM7QUFDM0NGLGNBQVEsRUFBRWhCLGdCQUFGLEVBQVdDLGtCQUFYLEVBQXFCRixNQUFNbUIsTUFBM0IsRUFBUjtBQUNELEtBSkQsRUFJRyxLQUpIO0FBS0QsR0FQRDtBQVFELEMiLCJmaWxlIjoiY3JlYXRlRXZlbnRTb3VyY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29tYmluZVVybCBmcm9tICcuL2NvbWJpbmVVcmwnXG5pbXBvcnQgaGFuZGxlcnMgZnJvbSAnLi9ldmVudEhhbmRsZXJzJ1xuXG5jb25zdCB0cnlQYXJzZSA9ICh7IGRhdGEsIG9wdGlvbnMsIGRpc3BhdGNoIH0pID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAndGFob2UuZmFpbHVyZScsXG4gICAgICBtZXRhOiBvcHRpb25zLFxuICAgICAgcGF5bG9hZDogZXJyXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoeyBvcHRpb25zLCBkaXNwYXRjaCB9KSA9PiB7XG4gIGNvbnN0IGZpbmFsVXJsID0gY29tYmluZVVybChvcHRpb25zLmVuZHBvaW50LCBvcHRpb25zLnF1ZXJ5KVxuICBjb25zdCBzcmMgPSBuZXcgRXZlbnRTb3VyY2UoZmluYWxVcmwsIHsgd2l0aENyZWRlbnRpYWxzOiBvcHRpb25zLndpdGhDcmVkZW50aWFscyB9KVxuXG4gIC8vIHdpcmUgdXAgbGlzdGVuZXJzIG4gc2hpelxuICBPYmplY3Qua2V5cyhoYW5kbGVycykuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IGhhbmRsZXJzW2V2ZW50TmFtZV1cbiAgICBzcmMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsICh7IGRhdGEgfSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gZGF0YSAmJiB0cnlQYXJzZSh7IG9wdGlvbnMsIGRpc3BhdGNoLCBkYXRhIH0pXG4gICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgcGFyc2VkID09PSAndW5kZWZpbmVkJykgcmV0dXJuXG4gICAgICBoYW5kbGVyKHsgb3B0aW9ucywgZGlzcGF0Y2gsIGRhdGE6IHBhcnNlZCB9KVxuICAgIH0sIGZhbHNlKVxuICB9KVxufVxuIl19