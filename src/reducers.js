import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

const initialCollections = Map()
const initialRequests = Map()

// shallow entity state
const addEntities = (state, { payload }) => {
  if (!payload.normalized) return state
  return fromJS(payload.normalized.entities).mergeDeep(state)
}
const updateEntities = (state, { payload }) => {
  if (!payload.normalized) return state
  return state.mergeDeep(fromJS(payload.normalized.next.entities))
}
const deleteEntities = (state, { payload }) => {
  if (!payload.normalized) return state
  return state
}

// request state
const setResponse = (state, { meta, payload }) => {
  if (!meta.requestId) return state
  let path = meta.requestId.split('.')
  return state.setIn(path, fromJS(payload.raw))
}
const insertToResponse = (state, { meta, payload }) => {
  if (!meta.requestId) return state
  let path = meta.requestId.split('.')
  return state.updateIn(path, (v) => {
    let newDoc = fromJS(payload.raw)
    if (!List.isList(v)) return newDoc
    return v.push(newDoc)
  })
}
const updateResponse = (state, { meta, payload }) => {
  if (!meta.requestId) return state
  let path = meta.requestId.split('.')
  return state.updateIn(path, (v) => {
    let next = fromJS(payload.raw.next)
    if (!List.isList(v)) return next

    let prevId = payload.raw.prev.id
    let idx = v.findIndex((i) => i.get('id') === prevId)
    return v.set(idx, next)
  })
}
const deleteFromResponse = (state, { meta, payload }) => {
  if (!meta.requestId) return state
  let path = meta.requestId.split('.')
  if (!List.isList(state.getIn(path))) return state.removeIn(path)

  return state.updateIn(path, (v) => {
    let prevId = payload.raw.id
    let idx = v.findIndex((i) => i.get('id') === prevId)
    return v.delete(idx)
  })
}

const setResponseError = (state, { meta, payload }) => {
  if (meta.requestId) {
    let path = meta.requestId.split('.')
    return state.setIn(path, Map({ error: payload }))
  }
  return state
}

// exported actions
export const collections = handleActions({
  'tahoe.success': addEntities,
  'tahoe.tail.insert': addEntities,
  'tahoe.tail.update': updateEntities,
  'tahoe.tail.delete': deleteEntities
}, initialCollections)

export const requests = handleActions({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': insertToResponse,
  'tahoe.tail.update': updateResponse,
  'tahoe.tail.delete': deleteFromResponse
}, initialRequests)
