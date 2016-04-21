export default {
  insert : {
    normalized: (getEntities, prev, next, opt) => getEntities(next, opt),
    raw: (prev, next) => next
  },
  update: {
    normalized: (getEntities, prev, next, opt) => ({
      prev: getEntities(prev, opt),
      next : getEntities(next, opt)
    }),
    raw: (prev, next) => ({
      prev,
      next
    })
  },
  delete: {
    normalized: (getEntities, prev, next, opt) => getEntities(prev, opt),
    raw: (prev) => prev
  }
}
