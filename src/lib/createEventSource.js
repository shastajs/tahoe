import url from 'url'
import entify from './entify'
import eventHandlers from './eventHandlers.js'


export const handleMessage = (opt, dispatch, messageType) => ({ data }) => {
  try {
    dispatchMessageType(JSON.parse(data), opt, dispatch, entify, messageType)
  } catch (err) {
    dispatch({
      type: 'tahoe.failure',
      meta: opt,
      payload: err
    })
  }
}

export const getPayload = ({ prev, next }, opt, getEntities, messageType) => {
  const normalized = opt.model ? eventHandlers[messageType].normalized(getEntities, prev, next, opt) : null
  const raw = eventHandlers[messageType].raw(prev, next)
  return {
    normalized,
    raw
  }
}

export const dispatchMessageType = (data, opt, dispatch, getEntities, messageType) => 
  dispatch({
    type: `tahoe.tail.${messageType}`,
    meta: opt,
    payload : getPayload(data, opt, getEntities, messageType)
  })

const combineUrl = (endpoint, query) => {
  const ay = url.parse(endpoint, true)
  delete ay.querystring
  ay.query = {
    ...ay.query,
    ...query
  }
  return url.format(ay)
}

const addListeners = (src, opt, dispatch) => {
  Object.keys(eventHandlers).forEach(
    messageType => src.addEventListener(messageType, handleMessage(opt, dispatch, messageType))
  )
}

export default (opt, dispatch) => {
  const finalUrl = combineUrl(opt.endpoint, opt.query)
  const src = new EventSource(finalUrl, { withCredentials: opt.withCredentials })
  addListeners(src, opt, dispatch)
}


