import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'

const initialCollections = Map()
const initialSubsets = Map()

// shallow entity state
const addEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return fromJS(normalized.entities).mergeDeep(state)
}
const updateEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return state.mergeDeep(fromJS(normalized.next.entities))
}
const deleteEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return state
}

// subset state
const setResponse = (state, { meta: { subset }, payload: { raw } }) => {
  if (!subset) return state
  const path = subset.split('.')
  return state.setIn(path, fromJS(raw))
}
const insertToResponse = (state, { meta: { subset }, payload: { raw } }) => {
  if (!subset) return state
  const path = subset.split('.')
  return state.updateIn(path, (v) => {
    const newDoc = fromJS(raw)
    if (!List.isList(v)) return newDoc
    return v.push(newDoc)
  })
}
const updateResponse = (state, { meta: { subset }, payload: { raw } }) => {
  if (!subset) return state
  const path = subset.split('.')
  return state.updateIn(path, (v) => {
    const next = fromJS(raw.next)
    if (!List.isList(v)) return next

    const prevId = raw.prev.id
    const idx = v.findIndex((i) => i.get('id') === prevId)
    return v.set(idx, next)
  })
}
const deleteFromResponse = (state, { meta: { subset }, payload: { raw } }) => {
  if (!subset) return state
  const path = subset.split('.')
  if (!List.isList(state.getIn(path))) return state.removeIn(path)

  return state.updateIn(path, (v) => {
    const prevId = raw.id
    const idx = v.findIndex((i) => i.get('id') === prevId)
    return v.delete(idx)
  })
}

const setResponseError = (state, { meta: { subset }, payload: { error } }) => {
  if (subset) {
    const path = subset.split('.')
    return state.setIn([ ...path, 'error' ], error)
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

export const subsets = handleActions({
  'tahoe.success': setResponse,
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': insertToResponse,
  'tahoe.tail.update': updateResponse,
  'tahoe.tail.delete': deleteFromResponse
}, initialSubsets)
