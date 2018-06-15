'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (endpoint, query) {
  var parsed = _url2.default.parse(endpoint);

  var q = _qs2.default.stringify((0, _extends3.default)({}, _qs2.default.parse(parsed.query, { strictNullHandling: true }), query), { strictNullHandling: true });

  return _url2.default.format({
    protocol: parsed.protocol,
    auth: parsed.auth,
    port: parsed.port,
    host: parsed.host,
    pathname: parsed.pathname,
    search: q
  });
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29tYmluZVVybC5qcyJdLCJuYW1lcyI6WyJlbmRwb2ludCIsInF1ZXJ5IiwicGFyc2VkIiwidXJsIiwicGFyc2UiLCJxIiwicXMiLCJzdHJpbmdpZnkiLCJzdHJpY3ROdWxsSGFuZGxpbmciLCJmb3JtYXQiLCJwcm90b2NvbCIsImF1dGgiLCJwb3J0IiwiaG9zdCIsInBhdGhuYW1lIiwic2VhcmNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O2tCQUVlLFVBQUNBLFFBQUQsRUFBV0MsS0FBWCxFQUFxQjtBQUNsQyxNQUFNQyxTQUFTQyxjQUFJQyxLQUFKLENBQVVKLFFBQVYsQ0FBZjs7QUFFQSxNQUFNSyxJQUFJQyxhQUFHQyxTQUFILDRCQUNMRCxhQUFHRixLQUFILENBQVNGLE9BQU9ELEtBQWhCLEVBQXVCLEVBQUVPLG9CQUFvQixJQUF0QixFQUF2QixDQURLLEVBRUxQLEtBRkssR0FHUCxFQUFFTyxvQkFBb0IsSUFBdEIsRUFITyxDQUFWOztBQUtBLFNBQU9MLGNBQUlNLE1BQUosQ0FBVztBQUNoQkMsY0FBVVIsT0FBT1EsUUFERDtBQUVoQkMsVUFBTVQsT0FBT1MsSUFGRztBQUdoQkMsVUFBTVYsT0FBT1UsSUFIRztBQUloQkMsVUFBTVgsT0FBT1csSUFKRztBQUtoQkMsY0FBVVosT0FBT1ksUUFMRDtBQU1oQkMsWUFBUVY7QUFOUSxHQUFYLENBQVA7QUFRRCxDIiwiZmlsZSI6ImNvbWJpbmVVcmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXJsIGZyb20gJ3VybCdcbmltcG9ydCBxcyBmcm9tICdxcydcblxuZXhwb3J0IGRlZmF1bHQgKGVuZHBvaW50LCBxdWVyeSkgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB1cmwucGFyc2UoZW5kcG9pbnQpXG5cbiAgY29uc3QgcSA9IHFzLnN0cmluZ2lmeSh7XG4gICAgLi4ucXMucGFyc2UocGFyc2VkLnF1ZXJ5LCB7IHN0cmljdE51bGxIYW5kbGluZzogdHJ1ZSB9KSxcbiAgICAuLi5xdWVyeVxuICB9LCB7IHN0cmljdE51bGxIYW5kbGluZzogdHJ1ZSB9KVxuXG4gIHJldHVybiB1cmwuZm9ybWF0KHtcbiAgICBwcm90b2NvbDogcGFyc2VkLnByb3RvY29sLFxuICAgIGF1dGg6IHBhcnNlZC5hdXRoLFxuICAgIHBvcnQ6IHBhcnNlZC5wb3J0LFxuICAgIGhvc3Q6IHBhcnNlZC5ob3N0LFxuICAgIHBhdGhuYW1lOiBwYXJzZWQucGF0aG5hbWUsXG4gICAgc2VhcmNoOiBxXG4gIH0pXG59XG4iXX0=