'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = undefined;

var _reduxActions = require('redux-actions');

var _immutable = require('immutable');

var initialState = (0, _immutable.Map)({
  subsets: (0, _immutable.Map)()
});

// subset state
var createSubset = function createSubset(state, _ref) {
  var _ref$payload = _ref.payload;
  var subset = _ref$payload.subset;
  var fresh = _ref$payload.fresh;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!fresh && state.hasIn(path)) return state;
  var record = (0, _immutable.Map)({
    id: subset,
    pending: true
  });
  return state.setIn(path, record);
};

var setSubsetData = function setSubsetData(state, _ref2) {
  var subset = _ref2.meta.subset;
  var raw = _ref2.payload.raw;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  return state.updateIn(path, function (subset) {
    return subset.set('data', (0, _immutable.fromJS)(raw)).set('pending', false).set('error', null);
  });
};

var setSubsetError = function setSubsetError(state, _ref3) {
  var subset = _ref3.meta.subset;
  var payload = _ref3.payload;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  return state.updateIn(path, function (subset) {
    return subset.delete('data').set('error', payload).set('pending', false);
  });
};

var setSubsetOpen = function setSubsetOpen(state, _ref4) {
  var _ref4$meta = _ref4.meta;
  var subset = _ref4$meta.subset;
  var collection = _ref4$meta.collection;

  if (!subset) return state;
  var path = ['subsets', subset];
  if (!state.hasIn(path)) return state; // subset doesnt exist
  return state.updateIn(path, function (subset) {
    return subset.set('pending', false).set('data', collection ? (0, _immutable.List)() : (0, _immutable.Map)());
  });
};

var insertSubsetDataItem = function insertSubsetDataItem(state, _ref5) {
  var _ref5$meta = _ref5.meta;
  var subset = _ref5$meta.subset;
  var collection = _ref5$meta.collection;
  var raw = _ref5.payload.raw;

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
    });
  });
};

var updateSubsetDataItem = function updateSubsetDataItem(state, _ref6) {
  var _ref6$meta = _ref6.meta;
  var subset = _ref6$meta.subset;
  var collection = _ref6$meta.collection;
  var raw = _ref6.payload.raw;

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
var deleteSubsetDataItem = function deleteSubsetDataItem(state, _ref7) {
  var _ref7$meta = _ref7.meta;
  var subset = _ref7$meta.subset;
  var collection = _ref7$meta.collection;
  var raw = _ref7.payload.raw;

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
  'tahoe.success': setSubsetData,
  'tahoe.tail.open': setSubsetOpen,
  'tahoe.tail.insert': insertSubsetDataItem,
  'tahoe.tail.update': updateSubsetDataItem,
  'tahoe.tail.delete': deleteSubsetDataItem
}, initialState);