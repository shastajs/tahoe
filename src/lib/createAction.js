import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'
import sendRequest from './sendRequest'

const reserved = [
  'onResponse',
  'onError'
]
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn

// TODO:0 check entities cache in store and dont fetch if we have it already

/*
app must have redux-thunk installed
possible options:

- subset (optional)(string)
- tail (default false)(boolean)
- method (required)(get, post, put, delete, or patch)
- params (object)
- endpoint (required)(url tring)
- model (required)(normalizr model)
- collection (default false)(boolean)
- fresh (default to false)(boolean)

all options can either be a value, or a function that returns a value.
if you define a function, it will receive options.params as an argument
*/

// merge our multitude of option objects together
// defaults = options defined in createAction
// opt = options specified in action creator
const isReserved = (k) => reserved.indexOf(k) !== -1

export const mergeOptions = (defaults, opt) => {
  return mapValues(merge({}, opt, defaults), (v, k, { params }) => {
    if (isReserved(k)) return v
    return result(v, params)
  })
}

export default (defaults = {}) => (opt = {}) => {
  const options = mergeOptions(defaults, opt)
  if (!options.method) throw new Error('Missing method')
  if (!options.endpoint) throw new Error('Missing endpoint')
  return (dispatch) => sendRequest({ options, dispatch })
}
