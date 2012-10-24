
# events

Stand-alone event bindings, based on how Backbone's views handle events. 

## Installation

    $ component install matthewmueller/events

## Example

```js
var Events = require('events'),
    $ = require('jquery');

function Datepicker() {
  var el = $('<div class="datepicker">');
  this.bind('hover', 'highlight', 'select')
      .bind('keypress', function(e) { ... });
      .bind('click .day', 'select')
      .bind('click .next', this.next)
}

// Mixin `Events`
Events(Datepicker.prototype);

// Methods
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

### Events#bind([el], event, fns...)

Bind mouse and keyboard events to `el`. If no element is defined, Events tries binding to `this.el`.

The `event` signature is `event [selector]`. If no `selector` is specified, the event is attached to `el`. Here's a couple valid examples:

```
click .color
dblclick #save
mouseout div
keypress
hover
```

You may bind an arbitrary number of `fns` to the event. The functions context are set to `this` (none of that `_.bindAll` jazz). You may also pass strings that get resolved by `this[fn]`.

### Events#unbind([el], [event], [fn]);

TODO: Finish me... Right now you can simply unbind all events off `el`.

## TODO

* Finish unbind  
* Replace `component/jquery` with `component/event` and `component/delegate`

## License

  MIT
