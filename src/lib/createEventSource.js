import combineUrl from './combineUrl'
import handlers from './eventHandlers'

const tryParse = ({ data, options, dispatch }) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    dispatch({
      type: 'tahoe.failure',
      meta: options,
      payload: err
    })
  }
}

export default ({ options, dispatch }) => {
  const finalUrl = combineUrl(options.endpoint, options.query)
  const src = new EventSource(finalUrl, { withCredentials: options.withCredentials })

  // wire up listeners n shiz
  Object.keys(handlers).forEach((eventName) => {
    const handler = handlers[eventName]
    src.addEventListener(eventName, ({ data }) => {
      const parsed = data && tryParse(data)
      if (data && typeof parsed === 'undefined') return
      handler({ data: parsed, options, dispatch })
    }, false)
  })
}
