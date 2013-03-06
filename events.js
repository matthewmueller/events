/**
 * Module dependencies
 */

var Event = require('event'),
    Delegate = require('delegate'),
    slice = Array.prototype.slice;

/**
 * Regex to split keys for event delegation
 */

var splitter = /^(\S+)\s*(.*)$/;

/**
 * Events Hash
 */

var events = {};

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize a new `Events`.
 *
 * @api public
 */

function Events(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Events.prototype) {
    obj[key] = Events.prototype[key];
  }
  return obj;
}

/**
 * Binds events to elements. The `event` string looks like `event [selector]`,
 * where `event` is a click, hover, etc. and the optional `selector` will
 * bind events to elements within `el`. You may curry arguments and provide
 * many handler `fns` that will get bound to the elements.
 *
 * Example:
 *
 *   this.bind('click .day', 'select')
 *       .bind('mouseover', this.highlight)
 *       .bind('mouseout', 'unhighlight', 'fade')
 *
 * @param {HTMLElement} el (optional)
 * @param {String} event
 * @param {Function} fns...
 * @return {Events}
 * @api public
 */

Events.prototype.bind = function(el, event, fn) {
  if('string' == typeof el) fn = event, event = el, el = this.el;

  this._events = this._events || {};

  var events = this._events,
      match = event.match(splitter),
      eventName = match[1],
      selector = match[2];

  fn = ('string' == typeof fn) ? this[fn] : fn;
  fn = fn.bind(this);

  if(selector === '') Event.bind(el, eventName, fn);
  else fn = Delegate.bind(el, selector, eventName, fn);

  if(!events[eventName]) events[eventName] = [];
  events[eventName].push(fn);

  return this;
};

/**
 * Unbind events
 *
 */

Events.prototype.unbind = function(el, event, fn) {
  if(!el) el = this.el;
  else if('string' == typeof el) fn = event, event = el, el = this.el;

  var events = this._events;

  if(event && fn) {
    Event.unbind(el, event, fn);
    var i = events[event].indexOf(fn);
    events[event].splice(i, 1);
  } else if(event && !fn) {
    var fns = events[event];
    for (var i = 0, len = fns.length; i < len; i++) Event.unbind(el, event, fns[i])
    delete events[event];
  } else {
    for(var event in events) this.unbind(el, event);
    events = {};
  }

  return this;
};
