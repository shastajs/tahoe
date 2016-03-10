'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subsets = exports.collections = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _reduxActions = require('redux-actions');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialCollections = (0, _immutable.Map)();
var initialSubsets = (0, _immutable.Map)();

// shallow entity state
var addEntities = function addEntities(state, _ref) {
  var normalized = _ref.payload.normalized;

  if (!normalized) return state;
  return (0, _immutable.fromJS)(normalized.entities).mergeDeep(state);
};
var updateEntities = function updateEntities(state, _ref2) {
  var normalized = _ref2.payload.normalized;

  if (!normalized) return state;
  return state.mergeDeep((0, _immutable.fromJS)(normalized.next.entities));
};
var deleteEntities = function deleteEntities(state, _ref3) {
  var normalized = _ref3.payload.normalized;

  if (!normalized) return state;
  return state;
};

// subset state
var setResponse = function setResponse(state, _ref4) {
  var subset = _ref4.meta.subset;
  var raw = _ref4.payload.raw;

  if (!subset) return state;
  var path = subset.split('.');
  return state.setIn(path, (0, _immutable.fromJS)(raw));
};
var insertToResponse = function insertToResponse(state, _ref5) {
  var subset = _ref5.meta.subset;
  var raw = _ref5.payload.raw;

  if (!subset) return state;
  var path = subset.split('.');
  return state.updateIn(path, function (v) {
    var newDoc = (0, _immutable.fromJS)(raw);
    if (!_immutable.List.isList(v)) return newDoc;
    return v.push(newDoc);
  });
};
var updateResponse = function updateResponse(state, _ref6) {
  var subset = _ref6.meta.subset;
  var raw = _ref6.payload.raw;

  if (!subset) return state;
  var path = subset.split('.');
  return state.updateIn(path, function (v) {
    var next = (0, _immutable.fromJS)(raw.next);
    if (!_immutable.List.isList(v)) return next;

    var prevId = raw.prev.id;
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    return v.set(idx, next);
  });
};
var deleteFromResponse = function deleteFromResponse(state, _ref7) {
  var subset = _ref7.meta.subset;
  var raw = _ref7.payload.raw;

  if (!subset) return state;
  var path = subset.split('.');
  if (!_immutable.List.isList(state.getIn(path))) return state.removeIn(path);

  return state.updateIn(path, function (v) {
    var prevId = raw.id;
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    return v.delete(idx);
  });
};

var setResponseError = function setResponseError(state, _ref8) {
  var subset = _ref8.meta.subset;
  var payload = _ref8.payload;

  if (subset) {
    var path = subset.split('.');
    return state.setIn([].concat((0, _toConsumableArray3.default)(path), ['error']), payload);
  }
  return state;
};

// exported actions
var collections = exports.collections = (0, _reduxActions.handleActions)({
  'tahoe.success': addEntities,
  'tahoe.tail.insert': addEntities,
  'tahoe.tail.update': updateEntities,
  'tahoe.tail.delete': deleteEntities
}, initialCollections);

var subsets = exports.subsets = (0, _reduxActions.handleActions)({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': insertToResponse,
  'tahoe.tail.update': updateResponse,
  'tahoe.tail.delete': deleteFromResponse
}, initialSubsets);