'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var handlers = {};
handlers.open = function (_ref) {
  var options = _ref.options,
      dispatch = _ref.dispatch;
  return dispatch({
    type: 'tahoe.tail.open',
    meta: options
  });
};

handlers.insert = function (_ref2) {
  var options = _ref2.options,
      dispatch = _ref2.dispatch,
      next = _ref2.data.next;
  return dispatch({
    type: 'tahoe.tail.insert',
    meta: options,
    payload: {
      raw: next
    }
  });
};

handlers.update = function (_ref3) {
  var options = _ref3.options,
      dispatch = _ref3.dispatch,
      _ref3$data = _ref3.data,
      prev = _ref3$data.prev,
      next = _ref3$data.next;
  return dispatch({
    type: 'tahoe.tail.update',
    meta: options,
    payload: {
      raw: {
        prev: prev,
        next: next
      }
    }
  });
};

handlers.delete = function (_ref4) {
  var options = _ref4.options,
      dispatch = _ref4.dispatch,
      prev = _ref4.data.prev;
  return dispatch({
    type: 'tahoe.tail.delete',
    meta: options,
    payload: {
      raw: prev
    }
  });
};

exports.default = handlers;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZXZlbnRIYW5kbGVycy5qcyJdLCJuYW1lcyI6WyJoYW5kbGVycyIsIm9wZW4iLCJvcHRpb25zIiwiZGlzcGF0Y2giLCJ0eXBlIiwibWV0YSIsImluc2VydCIsIm5leHQiLCJkYXRhIiwicGF5bG9hZCIsInJhdyIsInVwZGF0ZSIsInByZXYiLCJkZWxldGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLElBQU1BLFdBQVcsRUFBakI7QUFDQUEsU0FBU0MsSUFBVCxHQUFnQjtBQUFBLE1BQUdDLE9BQUgsUUFBR0EsT0FBSDtBQUFBLE1BQVlDLFFBQVosUUFBWUEsUUFBWjtBQUFBLFNBQ2RBLFNBQVM7QUFDUEMsVUFBTSxpQkFEQztBQUVQQyxVQUFNSDtBQUZDLEdBQVQsQ0FEYztBQUFBLENBQWhCOztBQU1BRixTQUFTTSxNQUFULEdBQWtCO0FBQUEsTUFBR0osT0FBSCxTQUFHQSxPQUFIO0FBQUEsTUFBWUMsUUFBWixTQUFZQSxRQUFaO0FBQUEsTUFBOEJJLElBQTlCLFNBQXNCQyxJQUF0QixDQUE4QkQsSUFBOUI7QUFBQSxTQUNoQkosU0FBUztBQUNQQyxVQUFNLG1CQURDO0FBRVBDLFVBQU1ILE9BRkM7QUFHUE8sYUFBUztBQUNQQyxXQUFLSDtBQURFO0FBSEYsR0FBVCxDQURnQjtBQUFBLENBQWxCOztBQVNBUCxTQUFTVyxNQUFULEdBQWtCO0FBQUEsTUFBR1QsT0FBSCxTQUFHQSxPQUFIO0FBQUEsTUFBWUMsUUFBWixTQUFZQSxRQUFaO0FBQUEseUJBQXNCSyxJQUF0QjtBQUFBLE1BQThCSSxJQUE5QixjQUE4QkEsSUFBOUI7QUFBQSxNQUFvQ0wsSUFBcEMsY0FBb0NBLElBQXBDO0FBQUEsU0FDaEJKLFNBQVM7QUFDUEMsVUFBTSxtQkFEQztBQUVQQyxVQUFNSCxPQUZDO0FBR1BPLGFBQVM7QUFDUEMsV0FBSztBQUNIRSxjQUFNQSxJQURIO0FBRUhMLGNBQU1BO0FBRkg7QUFERTtBQUhGLEdBQVQsQ0FEZ0I7QUFBQSxDQUFsQjs7QUFhQVAsU0FBU2EsTUFBVCxHQUFrQjtBQUFBLE1BQUdYLE9BQUgsU0FBR0EsT0FBSDtBQUFBLE1BQVlDLFFBQVosU0FBWUEsUUFBWjtBQUFBLE1BQThCUyxJQUE5QixTQUFzQkosSUFBdEIsQ0FBOEJJLElBQTlCO0FBQUEsU0FDaEJULFNBQVM7QUFDUEMsVUFBTSxtQkFEQztBQUVQQyxVQUFNSCxPQUZDO0FBR1BPLGFBQVM7QUFDUEMsV0FBS0U7QUFERTtBQUhGLEdBQVQsQ0FEZ0I7QUFBQSxDQUFsQjs7a0JBU2VaLFEiLCJmaWxlIjoiZXZlbnRIYW5kbGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgaGFuZGxlcnMgPSB7fVxuaGFuZGxlcnMub3BlbiA9ICh7IG9wdGlvbnMsIGRpc3BhdGNoIH0pID0+XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAndGFob2UudGFpbC5vcGVuJyxcbiAgICBtZXRhOiBvcHRpb25zXG4gIH0pXG5cbmhhbmRsZXJzLmluc2VydCA9ICh7IG9wdGlvbnMsIGRpc3BhdGNoLCBkYXRhOiB7IG5leHQgfSB9KSA9PlxuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogJ3RhaG9lLnRhaWwuaW5zZXJ0JyxcbiAgICBtZXRhOiBvcHRpb25zLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIHJhdzogbmV4dFxuICAgIH1cbiAgfSlcblxuaGFuZGxlcnMudXBkYXRlID0gKHsgb3B0aW9ucywgZGlzcGF0Y2gsIGRhdGE6IHsgcHJldiwgbmV4dCB9IH0pID0+XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAndGFob2UudGFpbC51cGRhdGUnLFxuICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgcGF5bG9hZDoge1xuICAgICAgcmF3OiB7XG4gICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgIG5leHQ6IG5leHRcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cblxuaGFuZGxlcnMuZGVsZXRlID0gKHsgb3B0aW9ucywgZGlzcGF0Y2gsIGRhdGE6IHsgcHJldiB9IH0pID0+XG4gIGRpc3BhdGNoKHtcbiAgICB0eXBlOiAndGFob2UudGFpbC5kZWxldGUnLFxuICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgcGF5bG9hZDoge1xuICAgICAgcmF3OiBwcmV2XG4gICAgfVxuICB9KVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVyc1xuIl19