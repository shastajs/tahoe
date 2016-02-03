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