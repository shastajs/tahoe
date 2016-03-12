import { handleActions } from 'redux-actions'
import { Map, List, fromJS } from 'immutable'
import compose from 'reduce-reducers'

const initialState = Map({
  subsets: Map(),
  entities: Map()
})

// possible solutions:


// shallow entity state
const addEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return fromJS({ entities: normalized.entities }).mergeDeep(state)
}
const updateEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return state.mergeDeep(fromJS({ entities: normalized.next.entities }))
}
const deleteEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  // TODO
  return state
}

// subset state
const setResponse = (state, { meta: { subset }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  return state.setIn(path, fromJS(raw))
}
const insertToResponse = (state, { meta: { subset, collection }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  const newDoc = fromJS(raw)
  return state.updateIn(path, (v) => {
    // first event, initialize the value
    if (v == null && collection) {
      return List([ newDoc ])
    }

    // value exists, either push or replace
    return List.isList(v) ? v.push(newDoc) : newDoc
  })
}
const updateResponse = (state, { meta: { subset, collection }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  const next = fromJS(raw.next)
  const prevId = raw.prev.id
  return state.updateIn(path, (v) => {
    // not a list item, replace with new value
    if (!collection) {
      return next
    }

    // list item, find the index and do the update
    const idx = v.findIndex((i) => i.get('id') === prevId)
    if (idx == null) return v // not our data?
    return v.set(idx, next)
  })
}
const deleteFromResponse = (state, { meta: { subset, collection }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  const prevId = raw.id
  // not a list, just wipe the val
  if (!collection) {
    return state.removeIn(path)
  }
  // item in a list, remove the specific item
  return state.updateIn(path, (v) => {
    const idx = v.findIndex((i) => i.get('id') === prevId)
    return v.delete(idx)
  })
}

const setResponseError = (state, { meta: { subset }, payload }) => {
  if (!subset) return state
  return state.setIn([ 'subsets', subset, 'error' ], payload)
}

// exported actions
export const api = handleActions({
  'tahoe.success': compose(setResponse, addEntities),
  'tahoe.failure': setResponseError,
  'tahoe.tail.insert': compose(insertToResponse, addEntities),
  'tahoe.tail.update': compose(updateResponse, updateEntities),
  'tahoe.tail.delete': compose(deleteFromResponse, deleteEntities)
}, initialState)
