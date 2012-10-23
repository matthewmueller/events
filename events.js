/**
 * Module dependencies
 */

var $ = require('jquery');

/**
 * Regex to split keys for event delegation
 */

var splitter = /^(\S+)\s*(.*)$/;

/**
 * Bind events to a given `el`.
 *
 * Example:
 *
 *   bind(this, el, {
 *     "click"        : 'main',
 *     "hover .inner" : 'call',
 *     "keyup .key"   : function(e) { ... }
 *   });
 *
 * @param {object} context
 */

exports.bind = function(context, el, events) {
  if(!arguments[2]) events = el, el = context, context = this;

  for(var key in events) {
    var method = events[key];
    if ('function' !== typeof method) method = context[events[key]];
    if (!method) throw new Error('Method "' + events[key] + '" does not exist');
    
    method = method.bind(context);

    var match = key.match(splitter),
        eventName = match[1],
        selector = match[2];

    if(selector === '') {
      $(el).bind(eventName, method);
    } else {
      $(el).delegate(selector, eventName, method);
    }
  }
};

/**
 * Unbind events
 *
 * TODO: Finish me
 */

exports.unbind = function(el, event) {
  $(el).unbind(event);
};
