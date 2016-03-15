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

var ensureArray = function ensureArray(data) {
  return Array.isArray(data) ? data : [data];
};

// possible solutions:
// - subsets become maps that are basically pointers to existing nodes in the entities store
// - subsets become lists of IDs and entity types

// shallow entity state
var addEntities = function addEntities(state, _ref) {
  var normalized = _ref.payload.normalized;

  if (!normalized) return state;
  return (0, _immutable.fromJS)({ entities: normalized.entities }).mergeDeep(state);
};
var updateEntities = function updateEntities(state, _ref2) {
  var normalized = _ref2.payload.normalized;

  if (!normalized) return state;
  // TODO: handle situation where id changed!
  // TODO: nested relationships wonky here?
  return state.mergeDeep((0, _immutable.fromJS)({ entities: normalized.next.entities }));
};
var deleteEntities = function deleteEntities(state, _ref3) {
  var normalized = _ref3.payload.normalized;

  if (!normalized) return state;
  // TODO
  return state;
};

// subset state
var createSubset = function createSubset(state, _ref4) {
  var subset = _ref4.payload.subset;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (state.hasIn(path)) return state; // already exists
  var record = (0, _immutable.Map)({
    id: subset,
    pending: true
  });
  return state.setIn(path, record);
};

var setSubsetData = function setSubsetData(state, _ref5) {
  var subset = _ref5.meta.subset;
  var _ref5$payload = _ref5.payload;
  var raw = _ref5$payload.raw;
  var normalized = _ref5$payload.normalized;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  return state.updateIn(path, function (subset) {
    return subset.set('data', (0, _immutable.fromJS)(raw)).set('entities', (0, _immutable.Set)(ensureArray(normalized.result))).set('pending', false).set('error', null);
  });
};

var setSubsetError = function setSubsetError(state, _ref6) {
  var subset = _ref6.meta.subset;
  var payload = _ref6.payload;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  return state.updateIn(path, function (subset) {
    return subset.delete('data').delete('entities').set('error', payload).set('pending', false);
  });
};

var insertSubsetDataItem = function insertSubsetDataItem(state, _ref7) {
  var _ref7$meta = _ref7.meta;
  var subset = _ref7$meta.subset;
  var collection = _ref7$meta.collection;
  var _ref7$payload = _ref7.payload;
  var raw = _ref7$payload.raw;
  var normalized = _ref7$payload.normalized;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  var newData = (0, _immutable.fromJS)(raw);
  return state.updateIn(path, function (subset) {
    return subset.set('pending', false).update('data', function (data) {
      // first event, initialize the value
      if (data == null && collection) return (0, _immutable.List)([newData]);
      // value exists, either push or replace
      return collection ? data.push(newData) : newData;
    }).update('entities', function (entityIds) {
      var arr = ensureArray(normalized.result);
      if (entityIds == null) return (0, _immutable.Set)(arr);
      return entityIds.union(arr);
    });
  });
};

var updateSubsetDataItem = function updateSubsetDataItem(state, _ref8) {
  var _ref8$meta = _ref8.meta;
  var subset = _ref8$meta.subset;
  var collection = _ref8$meta.collection;
  var raw = _ref8.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  var dataPath = [].concat(path, ['data']);
  if (!state.hasIn(dataPath)) return state; // subset has no data to update
  var next = (0, _immutable.fromJS)(raw.next);
  return state.updateIn(dataPath, function (data) {
    // not a list item, replace with new value
    if (!collection) return next;

    // list item, find the index and do the update
    var idx = data.findIndex(function (i) {
      return i.get('id') === raw.prev.id;
    });
    if (idx == null) return data; // not our data?
    return data.set(idx, next);
  });
};
var deleteSubsetDataItem = function deleteSubsetDataItem(state, _ref9) {
  var _ref9$meta = _ref9.meta;
  var subset = _ref9$meta.subset;
  var collection = _ref9$meta.collection;
  var raw = _ref9.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  var dataPath = [].concat(path, ['data']);
  if (!state.hasIn(dataPath)) return state; // subset has no data to update

  // not a list, just wipe the val
  if (!collection) {
    return state.removeIn(dataPath);
  }
  // item in a list, remove the specific item
  return state.updateIn(dataPath, function (data) {
    var idx = data.findIndex(function (i) {
      return i.get('id') === raw.id;
    });
    if (idx == null) return data; // not our data?
    return data.delete(idx);
  });
};

// exported actions
var api = exports.api = (0, _reduxActions.handleActions)({
  'tahoe.request': createSubset,
  'tahoe.failure': setSubsetError,
  'tahoe.success': (0, _reduceReducers2.default)(setSubsetData, addEntities),
  'tahoe.tail.insert': (0, _reduceReducers2.default)(insertSubsetDataItem, addEntities),
  'tahoe.tail.update': (0, _reduceReducers2.default)(updateSubsetDataItem, updateEntities),
  'tahoe.tail.delete': (0, _reduceReducers2.default)(deleteSubsetDataItem, deleteEntities)
}, initialState);