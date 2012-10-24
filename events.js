/**
 * Module dependencies
 */

var $ = require('jquery'),
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

Events.prototype.bind = function(event, fns) {
  if(!arguments.length) return this;

  var self = this,
      el = this.el,
      args = slice.call(arguments);

  fns = args.slice(1);
  
  if(event.nodeType !== undefined) el = event, event = args[1], fns = args.slice(2);
  if(!el) throw new Error('Events: No element to bind to');

  var match = event.match(splitter),
      eventName = match[1] + '.events',
      selector = match[2],
      len = fns.length,
      fn;

  for(var i = 0; i < len; i++) {
    fn = fns[i];
    fn = (typeof fn === 'string') ? self[fn] : fn;
    fn = fn.bind(self);

    if(selector === '') $(el).on(eventName, fn);
    else $(el).on(eventName, selector, fn);
  }

  return this;
};

/**
 * Unbind events
 *
 * TODO: Finish me
 */

Events.prototype.unbind = function(event, fns) {
  var el = this.el,
      args = slice.call(arguments);

  // Remove all attached events
  if(!event) {
    $(el).off('.events');
    return this;
  }

  // FINISH!

  return this;
};
