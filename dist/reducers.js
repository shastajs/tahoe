'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requests = exports.collections = undefined;

var _reduxActions = require('redux-actions');

var _immutable = require('immutable');

var initialCollections = (0, _immutable.Map)();
var initialRequests = (0, _immutable.Map)();

// shallow entity state
var addEntities = function addEntities(state, _ref) {
  var payload = _ref.payload;

  if (!payload.normalized) return state;
  return (0, _immutable.fromJS)(payload.normalized.entities).mergeDeep(state);
};
var updateEntities = function updateEntities(state, _ref2) {
  var payload = _ref2.payload;

  if (!payload.normalized) return state;
  return state.mergeDeep((0, _immutable.fromJS)(payload.normalized.next.entities));
};
var deleteEntities = function deleteEntities(state, _ref3) {
  var payload = _ref3.payload;

  if (!payload.normalized) return state;
  return state;
};

// request state
var setResponse = function setResponse(state, _ref4) {
  var meta = _ref4.meta;
  var payload = _ref4.payload;

  if (!meta.requestId) return state;
  return state.set(meta.requestId, (0, _immutable.fromJS)(payload.raw));
};
var insertToResponse = function insertToResponse(state, _ref5) {
  var meta = _ref5.meta;
  var payload = _ref5.payload;

  if (!meta.requestId) return state;
  return state.update(meta.requestId, function (v) {
    var newDoc = (0, _immutable.fromJS)(payload.raw);
    if (!_immutable.List.isList(v)) return newDoc;
    return v.push(newDoc);
  });
};
var updateResponse = function updateResponse(state, _ref6) {
  var meta = _ref6.meta;
  var payload = _ref6.payload;

  if (!meta.requestId) return state;
  return state.update(meta.requestId, function (v) {
    var next = (0, _immutable.fromJS)(payload.raw.next);
    if (!_immutable.List.isList(v)) return next;

    var prevId = payload.raw.prev.id;
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    return v.set(idx, next);
  });
};
var deleteFromResponse = function deleteFromResponse(state, _ref7) {
  var meta = _ref7.meta;
  var payload = _ref7.payload;

  if (!meta.requestId) return state;
  if (!_immutable.List.isList(state.get(meta.requestId))) return state.remove(meta.requestId);

  return state.update(meta.requestId, function (v) {
    var prevId = payload.raw.id;
    var idx = v.findIndex(function (i) {
      return i.get('id') === prevId;
    });
    return v.delete(idx);
  });
};

var setResponseError = function setResponseError(state, _ref8) {
  var meta = _ref8.meta;
  var payload = _ref8.payload;

  if (meta.requestId) {
    return state.set(meta.requestId, (0, _immutable.Map)({ error: payload }));
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

var requests = exports.requests = (0, _reduxActions.handleActions)({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': insertToResponse,
  'tahoe.tail.update': updateResponse,
  'tahoe.tail.delete': deleteFromResponse
}, initialRequests);