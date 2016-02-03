import { normalize, arrayOf } from 'normalizr'

export default (body, opt) =>
  normalize(body, opt.collection
    ? arrayOf(opt.model)
    : opt.model)
