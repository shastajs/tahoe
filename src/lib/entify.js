import { normalize, arrayOf } from 'normalizr'

export default (body, { collection, model }) =>
  normalize(body, collection ? arrayOf(model) : model)
