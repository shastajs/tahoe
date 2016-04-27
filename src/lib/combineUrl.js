import url from 'url'

export default (endpoint, query) => {
  const ay = url.parse(endpoint, true)
  delete ay.querystring
  ay.query = {
    ...ay.query,
    ...query
  }
  return url.format(ay)
}
