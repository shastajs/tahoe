'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _createEventSource = require('./createEventSource');

var _createEventSource2 = _interopRequireDefault(_createEventSource);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResponseHandler = function createResponseHandler(_ref) {
  var options = _ref.options,
      dispatch = _ref.dispatch;

  var debug = options.method.toUpperCase() + ' ' + options.endpoint;
  return function (err, res) {
    if (!res && !err) {
      err = new Error('Connection failed: ' + debug);
    }
    if (!err && res.type !== 'application/json') {
      err = new Error('Unknown response type: \'' + res.type + '\' from ' + debug);
    }
    if (err) {
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      });
      if (options.onError) options.onError(err, res);
      return;
    }

    // handle json responses
    dispatch({
      type: 'tahoe.success',
      meta: options,
      payload: {
        raw: res.body
      }
    });
    if (options.onResponse) options.onResponse(res);
  };
};

exports.default = function (_ref2) {
  var options = _ref2.options,
      dispatch = _ref2.dispatch;

  dispatch({
    type: 'tahoe.request',
    payload: options
  });

  if (options.tail) {
    (0, _createEventSource2.default)({ options: options, dispatch: dispatch });
    return;
  }

  var req = _superagent2.default[options.method.toLowerCase()](options.endpoint);
  if (options.headers) {
    req.set(options.headers);
  }
  if (options.query) {
    req.query(typeof options.query === 'string' ? options.query : _qs2.default.stringify(options.query, { strictNullHandling: true }));
  }
  if (options.body) {
    req.send(options.body);
  }
  if (options.withCredentials) {
    req.withCredentials();
  }

  req.end(createResponseHandler({ options: options, dispatch: dispatch }));

  return req;
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc2VuZFJlcXVlc3QuanMiXSwibmFtZXMiOlsiY3JlYXRlUmVzcG9uc2VIYW5kbGVyIiwib3B0aW9ucyIsImRpc3BhdGNoIiwiZGVidWciLCJtZXRob2QiLCJ0b1VwcGVyQ2FzZSIsImVuZHBvaW50IiwiZXJyIiwicmVzIiwiRXJyb3IiLCJ0eXBlIiwibWV0YSIsInBheWxvYWQiLCJvbkVycm9yIiwicmF3IiwiYm9keSIsIm9uUmVzcG9uc2UiLCJ0YWlsIiwicmVxIiwidG9Mb3dlckNhc2UiLCJoZWFkZXJzIiwic2V0IiwicXVlcnkiLCJzdHJpbmdpZnkiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJzZW5kIiwid2l0aENyZWRlbnRpYWxzIiwiZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLHdCQUF3QixTQUF4QkEscUJBQXdCLE9BQTJCO0FBQUEsTUFBeEJDLE9BQXdCLFFBQXhCQSxPQUF3QjtBQUFBLE1BQWZDLFFBQWUsUUFBZkEsUUFBZTs7QUFDdkQsTUFBTUMsUUFBV0YsUUFBUUcsTUFBUixDQUFlQyxXQUFmLEVBQVgsU0FBMkNKLFFBQVFLLFFBQXpEO0FBQ0EsU0FBTyxVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBYztBQUNuQixRQUFJLENBQUNBLEdBQUQsSUFBUSxDQUFDRCxHQUFiLEVBQWtCO0FBQ2hCQSxZQUFNLElBQUlFLEtBQUoseUJBQWdDTixLQUFoQyxDQUFOO0FBQ0Q7QUFDRCxRQUFJLENBQUNJLEdBQUQsSUFBUUMsSUFBSUUsSUFBSixLQUFhLGtCQUF6QixFQUE2QztBQUMzQ0gsWUFBTSxJQUFJRSxLQUFKLCtCQUFxQ0QsSUFBSUUsSUFBekMsZ0JBQXVEUCxLQUF2RCxDQUFOO0FBQ0Q7QUFDRCxRQUFJSSxHQUFKLEVBQVM7QUFDUEwsZUFBUztBQUNQUSxjQUFNLGVBREM7QUFFUEMsY0FBTVYsT0FGQztBQUdQVyxpQkFBU0w7QUFIRixPQUFUO0FBS0EsVUFBSU4sUUFBUVksT0FBWixFQUFxQlosUUFBUVksT0FBUixDQUFnQk4sR0FBaEIsRUFBcUJDLEdBQXJCO0FBQ3JCO0FBQ0Q7O0FBRUQ7QUFDQU4sYUFBUztBQUNQUSxZQUFNLGVBREM7QUFFUEMsWUFBTVYsT0FGQztBQUdQVyxlQUFTO0FBQ1BFLGFBQUtOLElBQUlPO0FBREY7QUFIRixLQUFUO0FBT0EsUUFBSWQsUUFBUWUsVUFBWixFQUF3QmYsUUFBUWUsVUFBUixDQUFtQlIsR0FBbkI7QUFDekIsR0ExQkQ7QUEyQkQsQ0E3QkQ7O2tCQStCZSxpQkFBMkI7QUFBQSxNQUF4QlAsT0FBd0IsU0FBeEJBLE9BQXdCO0FBQUEsTUFBZkMsUUFBZSxTQUFmQSxRQUFlOztBQUN4Q0EsV0FBUztBQUNQUSxVQUFNLGVBREM7QUFFUEUsYUFBU1g7QUFGRixHQUFUOztBQUtBLE1BQUlBLFFBQVFnQixJQUFaLEVBQWtCO0FBQ2hCLHFDQUFrQixFQUFFaEIsZ0JBQUYsRUFBV0Msa0JBQVgsRUFBbEI7QUFDQTtBQUNEOztBQUVELE1BQU1nQixNQUFNLHFCQUFRakIsUUFBUUcsTUFBUixDQUFlZSxXQUFmLEVBQVIsRUFBc0NsQixRQUFRSyxRQUE5QyxDQUFaO0FBQ0EsTUFBSUwsUUFBUW1CLE9BQVosRUFBcUI7QUFDbkJGLFFBQUlHLEdBQUosQ0FBUXBCLFFBQVFtQixPQUFoQjtBQUNEO0FBQ0QsTUFBSW5CLFFBQVFxQixLQUFaLEVBQW1CO0FBQ2pCSixRQUFJSSxLQUFKLENBQVUsT0FBT3JCLFFBQVFxQixLQUFmLEtBQXlCLFFBQXpCLEdBQ05yQixRQUFRcUIsS0FERixHQUVOLGFBQUdDLFNBQUgsQ0FBYXRCLFFBQVFxQixLQUFyQixFQUE0QixFQUFFRSxvQkFBb0IsSUFBdEIsRUFBNUIsQ0FGSjtBQUdEO0FBQ0QsTUFBSXZCLFFBQVFjLElBQVosRUFBa0I7QUFDaEJHLFFBQUlPLElBQUosQ0FBU3hCLFFBQVFjLElBQWpCO0FBQ0Q7QUFDRCxNQUFJZCxRQUFReUIsZUFBWixFQUE2QjtBQUMzQlIsUUFBSVEsZUFBSjtBQUNEOztBQUVEUixNQUFJUyxHQUFKLENBQVEzQixzQkFBc0IsRUFBRUMsZ0JBQUYsRUFBV0Msa0JBQVgsRUFBdEIsQ0FBUjs7QUFFQSxTQUFPZ0IsR0FBUDtBQUNELEMiLCJmaWxlIjoic2VuZFJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVxdWVzdCBmcm9tICdzdXBlcmFnZW50J1xuaW1wb3J0IGNyZWF0ZUV2ZW50U291cmNlIGZyb20gJy4vY3JlYXRlRXZlbnRTb3VyY2UnXG5pbXBvcnQgcXMgZnJvbSAncXMnXG5cbmNvbnN0IGNyZWF0ZVJlc3BvbnNlSGFuZGxlciA9ICh7IG9wdGlvbnMsIGRpc3BhdGNoIH0pID0+IHtcbiAgY29uc3QgZGVidWcgPSBgJHtvcHRpb25zLm1ldGhvZC50b1VwcGVyQ2FzZSgpfSAke29wdGlvbnMuZW5kcG9pbnR9YFxuICByZXR1cm4gKGVyciwgcmVzKSA9PiB7XG4gICAgaWYgKCFyZXMgJiYgIWVycikge1xuICAgICAgZXJyID0gbmV3IEVycm9yKGBDb25uZWN0aW9uIGZhaWxlZDogJHtkZWJ1Z31gKVxuICAgIH1cbiAgICBpZiAoIWVyciAmJiByZXMudHlwZSAhPT0gJ2FwcGxpY2F0aW9uL2pzb24nKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoYFVua25vd24gcmVzcG9uc2UgdHlwZTogJyR7cmVzLnR5cGV9JyBmcm9tICR7ZGVidWd9YClcbiAgICB9XG4gICAgaWYgKGVycikge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAndGFob2UuZmFpbHVyZScsXG4gICAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICAgIHBheWxvYWQ6IGVyclxuICAgICAgfSlcbiAgICAgIGlmIChvcHRpb25zLm9uRXJyb3IpIG9wdGlvbnMub25FcnJvcihlcnIsIHJlcylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGhhbmRsZSBqc29uIHJlc3BvbnNlc1xuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICd0YWhvZS5zdWNjZXNzJyxcbiAgICAgIG1ldGE6IG9wdGlvbnMsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIHJhdzogcmVzLmJvZHlcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmIChvcHRpb25zLm9uUmVzcG9uc2UpIG9wdGlvbnMub25SZXNwb25zZShyZXMpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHsgb3B0aW9ucywgZGlzcGF0Y2ggfSkgPT4ge1xuICBkaXNwYXRjaCh7XG4gICAgdHlwZTogJ3RhaG9lLnJlcXVlc3QnLFxuICAgIHBheWxvYWQ6IG9wdGlvbnNcbiAgfSlcblxuICBpZiAob3B0aW9ucy50YWlsKSB7XG4gICAgY3JlYXRlRXZlbnRTb3VyY2UoeyBvcHRpb25zLCBkaXNwYXRjaCB9KVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgcmVxID0gcmVxdWVzdFtvcHRpb25zLm1ldGhvZC50b0xvd2VyQ2FzZSgpXShvcHRpb25zLmVuZHBvaW50KVxuICBpZiAob3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgcmVxLnNldChvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgaWYgKG9wdGlvbnMucXVlcnkpIHtcbiAgICByZXEucXVlcnkodHlwZW9mIG9wdGlvbnMucXVlcnkgPT09ICdzdHJpbmcnXG4gICAgICA/IG9wdGlvbnMucXVlcnlcbiAgICAgIDogcXMuc3RyaW5naWZ5KG9wdGlvbnMucXVlcnksIHsgc3RyaWN0TnVsbEhhbmRsaW5nOiB0cnVlIH0pKVxuICB9XG4gIGlmIChvcHRpb25zLmJvZHkpIHtcbiAgICByZXEuc2VuZChvcHRpb25zLmJvZHkpXG4gIH1cbiAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgcmVxLndpdGhDcmVkZW50aWFscygpXG4gIH1cblxuICByZXEuZW5kKGNyZWF0ZVJlc3BvbnNlSGFuZGxlcih7IG9wdGlvbnMsIGRpc3BhdGNoIH0pKVxuXG4gIHJldHVybiByZXFcbn1cbiJdfQ==