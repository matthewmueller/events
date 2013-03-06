# events

Stand-alone event bindings, based on how Backbone's views handle events. Without the jQuery.

Unlike some of the other component event libraries, this library combines event binding and event delegation.

## Installation

    $ component install matthewmueller/events

## Example

```js
var Events = require('events'),
    domify = require('domify')

function Datepicker() {
  this.el = domify('<div class="datepicker">')[0];
  this.bind('hover', 'highlight')
      .bind('keypress', function(e) { ... });
      .bind('click .day', 'select')
      .bind('click .next', this.next)

  this.unbind('click');
}

// Mixin `Events`
Events(Datepicker.prototype);

// Methods
Datepicker.prototype.hover = function(e) { ... };
Datepicker.prototype.select = function(e) { ... };
Datepicker.prototype.next = function(e) { ... };
Datepicker.prototype.highlight = function(e) { ... };
```

## API

### Events(obj)

Mixin `Events` into an object or prototype.

```js
Events(Colorpicker.prototype);
```

### Events#bind([el], event, fn)

Bind mouse and keyboard events to `el`. If no element is defined, Events tries binding to `this.el`.

The `event` signature is `event [selector]`. If no `selector` is specified, the event is attached to `el`. Here's a couple valid examples:

```
click .color
dblclick #save
mouseout div
keypress
hover
```

### Events#unbind([el], [event], [fn]);

Unbind events. If no `fn` is given all functions `event` will be unbound. If no `event` is given, all  functions for all events will be unbound.

## TODO

* Passing a delegated function to `unbind` doesn't quite work

```js
this.bind('click a', fn);
this.unbind('click', fn); // wont work as it's not same function that gets attached.
```

## License

  MIT
