import { handleActions } from 'redux-actions'
import { Map, List, Set, fromJS } from 'immutable'
import compose from 'reduce-reducers'

const initialState = Map({
  subsets: Map(),
  entities: Map()
})

const ensureArray = (data) =>
  Array.isArray(data) ? data : [ data ]

// possible solutions:
// - subsets become maps that are basically pointers to existing nodes in the entities store
// - subsets become lists of IDs and entity types

// shallow entity state
const addEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  return fromJS({ entities: normalized.entities }).mergeDeep(state)
}
const updateEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  // TODO: handle situation where id changed!
  // TODO: nested relationships wonky here?
  return state.mergeDeep(fromJS({ entities: normalized.next.entities }))
}
const deleteEntities = (state, { payload: { normalized } }) => {
  if (!normalized) return state
  // TODO
  return state
}

// subset state
const createSubset = (state, { payload: { subset } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (state.hasIn(path)) return state
  const record = Map({
    id: subset,
    pending: true
  })
  return state.setIn(path, record)
}

const setSubsetData = (state, { meta: { subset }, payload: { raw, normalized } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (!state.hasIn(path)) return state // subset doesnt exist
  return state.updateIn(path, (subset) =>
    subset
      .set('data', fromJS(raw))
      .set('entities', Set(ensureArray(normalized.result)))
      .set('pending', false)
      .set('error', null)
  )
}

const setSubsetError = (state, { meta: { subset }, payload }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (!state.hasIn(path)) return state // subset doesnt exist
  return state.updateIn(path, (subset) =>
    subset
      .delete('data')
      .delete('entities')
      .set('error', payload)
      .set('pending', false)
  )
}

const insertSubsetDataItem = (state, { meta: { subset, collection }, payload: { raw, normalized } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (!state.hasIn(path)) return state // subset doesnt exist
  const newData = fromJS(raw)
  return state.updateIn(path, (subset) =>
    subset
      .set('pending', false)
      .update('data', (data) => {
        // first event, initialize the value
        if (data == null && collection) return List([ newData ])
        // value exists, either push or replace
        return collection ? data.push(newData) : newData
      })
      .update('entities', (entityIds) => {
        const arr = ensureArray(normalized.result)
        if (entityIds == null) return Set(arr)
        return entityIds.union(arr)
      })
  )
}

const updateSubsetDataItem = (state, { meta: { subset, collection }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (!state.hasIn(path)) return state // subset doesnt exist
  const dataPath = [ ...path, 'data' ]
  if (!state.hasIn(dataPath)) return state // subset has no data to update
  const next = fromJS(raw.next)
  return state.updateIn(dataPath, (data) => {
    // not a list item, replace with new value
    if (!collection) return next

    // list item, find the index and do the update
    const idx = data.findIndex((i) => i.get('id') === raw.prev.id)
    if (idx == null) return data // not our data?
    return data.set(idx, next)
  })
}
const deleteSubsetDataItem = (state, { meta: { subset, collection }, payload: { raw } }) => {
  if (!subset) return state
  const path = [ 'subsets', subset ]
  if (!state.hasIn(path)) return state // subset doesnt exist
  const dataPath = [ ...path, 'data' ]
  if (!state.hasIn(dataPath)) return state // subset has no data to update

  // not a list, just wipe the val
  if (!collection) {
    return state.removeIn(dataPath)
  }
  // item in a list, remove the specific item
  return state.updateIn(dataPath, (data) => {
    const idx = data.findIndex((i) => i.get('id') === raw.id)
    if (idx == null) return data // not our data?
    return data.delete(idx)
  })
}

// exported actions
export const api = handleActions({
  'tahoe.request': createSubset,
  'tahoe.failure': setSubsetError,
  'tahoe.success': compose(setSubsetData, addEntities),
  'tahoe.tail.insert': compose(insertSubsetDataItem, addEntities),
  'tahoe.tail.update': compose(updateSubsetDataItem, updateEntities),
  'tahoe.tail.delete': compose(deleteSubsetDataItem, deleteEntities)
}, initialState)
