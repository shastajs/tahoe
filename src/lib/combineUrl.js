import url from 'url'
import qs from 'qs'

export default (endpoint, query) => {
  const parsed = url.parse(endpoint)

  const q = qs.stringify({
    ...qs.parse(parsed.query),
    ...query
  })

  return url.format({
    protocol: parsed.protocol,
    auth: parsed.auth,
    port: parsed.port,
    host: parsed.host,
    pathname: parsed.pathname,
    search: q
  })
}
