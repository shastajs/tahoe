'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = undefined;

var _reduxActions = require('redux-actions');

var _immutable = require('immutable');

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = (0, _immutable.Map)({
  subsets: (0, _immutable.Map)(),
  entities: (0, _immutable.Map)()
});

// possible solutions:

// shallow entity state
var addEntities = function addEntities(state, _ref) {
  var normalized = _ref.payload.normalized;

  if (!normalized) return state;
  return (0, _immutable.fromJS)({ entities: normalized.entities }).mergeDeep(state);
};
var updateEntities = function updateEntities(state, _ref2) {
  var normalized = _ref2.payload.normalized;

  if (!normalized) return state;
  return state.mergeDeep((0, _immutable.fromJS)({ entities: normalized.next.entities }));
};
var deleteEntities = function deleteEntities(state, _ref3) {
  var normalized = _ref3.payload.normalized;

  if (!normalized) return state;
  // TODO
  return state;
};

// subset state
var setResponse = function setResponse(state, _ref4) {
  var subset = _ref4.meta.subset;
  var raw = _ref4.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  return state.setIn(path, (0, _immutable.fromJS)(raw));
};
var insertToResponse = function insertToResponse(state, _ref5) {
  var _ref5$meta = _ref5.meta;
  var subset = _ref5$meta.subset;
  var collection = _ref5$meta.collection;
  var raw = _ref5.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  var newDoc = (0, _immutable.fromJS)(raw);
  return state.updateIn(path, function (v) {
    // first event, initialize the value
    if (v == null && collection) {
      return (0, _immutable.List)([newDoc]);
    }

    // value exists, either push or replace
    return _immutable.List.isList(v) ? v.push(newDoc) : newDoc;
  });
};
var updateResponse = function updateResponse(state, _ref6) {
  var _ref6$meta = _ref6.meta;
  var subset = _ref6$meta.subset;
  var collection = _ref6$meta.collection;
  var raw = _ref6.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  var next = (0, _immutable.fromJS)(raw.next);
  var prevId = raw.prev.id;
  return state.updateIn(path, function (v) {
    // not a list item, replace with new value
    if (!collection) {
      return next;
    }

    // list item, find the index and do the update
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    if (idx == null) return v; // not our data?
    return v.set(idx, next);
  });
};
var deleteFromResponse = function deleteFromResponse(state, _ref7) {
  var _ref7$meta = _ref7.meta;
  var subset = _ref7$meta.subset;
  var collection = _ref7$meta.collection;
  var raw = _ref7.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  var prevId = raw.id;
  // not a list, just wipe the val
  if (!collection) {
    return state.removeIn(path);
  }
  // item in a list, remove the specific item
  return state.updateIn(path, function (v) {
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    return v.delete(idx);
  });
};

var setResponseError = function setResponseError(state, _ref8) {
  var subset = _ref8.meta.subset;
  var payload = _ref8.payload;

  if (!subset) return state;
  return state.setIn(['subsets', subset, 'error'], payload);
};

// exported actions
var api = exports.api = (0, _reduxActions.handleActions)({
  'tahoe.success': (0, _reduceReducers2.default)(setResponse, addEntities),
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': (0, _reduceReducers2.default)(insertToResponse, addEntities),
  'tahoe.tail.update': (0, _reduceReducers2.default)(updateResponse, updateEntities),
  'tahoe.tail.delete': (0, _reduceReducers2.default)(deleteFromResponse, deleteEntities)
}, initialState);