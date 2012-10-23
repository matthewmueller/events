
# events

Stand-alone event bindings, based on how Backbone's views handle events. 

## Installation

    $ component install matthewmueller/events

## Example

```js
var events = require('events'),
    $ = require('jquery');

function Datepicker() {
  var el = $('<div class="datepicker">');
  events.bind(this, el, this.events);
}

Datepicker.prototype.events = {
  'click .day'  : 'select',
  'click .next' : 'next',
  'hover'       : 'highlight',
  'keypress'    : function(e) { ... }
}

Datepicker.prototype.select = function(e) { ... };
Datepicker.prototype.next = function(e) { ... };
Datepicker.prototype.highlight = function(e) { ... };
```

## API

### events#bind([context], el, events)

Bind mouse and keyboard events to `el`. The `events` object signature looks like this: `{ event [selector] : action }`. If a `selector` is provided, an event performed on the selected element will be delegated to `el`. The `action` will be bound to the optional `context`, which defaults to `window`.

### events#unbind(el, event, [fn]);

TODO: Finish me...

## TODO

* Finish unbind  
* Replace `component/jquery` with `component/event` and `component/delegate`

## License

  MIT
