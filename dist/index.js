'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createAction = require('./lib/createAction');

var _createAction2 = _interopRequireDefault(_createAction);

var _reducers = require('./reducers');

var reducers = _interopRequireWildcard(_reducers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createAction: _createAction2.default,
  reducers: reducers
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZWR1Y2VycyIsImNyZWF0ZUFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsUTs7Ozs7O2tCQUVHO0FBQ2JDLHNDQURhO0FBRWJELFlBQVVBO0FBRkcsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGVBY3Rpb24gZnJvbSAnLi9saWIvY3JlYXRlQWN0aW9uJ1xuaW1wb3J0ICogYXMgcmVkdWNlcnMgZnJvbSAnLi9yZWR1Y2VycydcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVBY3Rpb24sXG4gIHJlZHVjZXJzOiByZWR1Y2Vyc1xufVxuIl19