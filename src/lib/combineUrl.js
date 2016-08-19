import url from 'url'

export default (endpoint, query) => {
  const ay = url.parse(endpoint, true)
  // TODO: use qs module
  delete ay.querystring
  ay.query = {
    ...ay.query,
    ...query
  }
  return url.format(ay)
}
