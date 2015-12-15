phosphor-widget
===============

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-widget.svg)](https://travis-ci.org/phosphorjs/phosphor-widget?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-widget/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-widget?branch=master)

The core Phosphor widget class.

[API Docs](http://phosphorjs.github.io/phosphor-widget/api/)

Phosphor widgets provide several useful behaviours:

- **Widget Hierarchy** - A widget is a JS object which wraps a DOM node and
  establishes a live parent-child relationship. While this may seem trivial,
  it allows for the implementation of advanced message passing and notification
  behaviors, and provides a sane pattern for component reuse.

- **Messages** - Standard messages include show/hide, attach/detach, resize,
  and close, to name just a few. Desktop GUI toolkits have had these for ages,
  but they are missing from the DOM. These sorts of messages are critical for
  creating a desktop-like experience in the browser. Users can also define
  their own custom messages to support advanced behavior.

- **Unopinionated Design** - *Any* DOM content can be added to a widget.
  [Examples](https://phosphorjs.github.io/examples.html) exist for React
  and others, but the `node` attribute of a `Widget` is just a standard
  DOM node, so content generated by nearly any framework can be hosted
  by a widget.


Package Install
---------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-widget
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-widget.git
cd phosphor-widget
npm install
```

**Rebuild**
```bash
npm run clean
npm run build
```


Run Tests
---------

Follow the source build instructions first.

```bash
# run tests in Firefox
npm test

# run tests in Chrome
npm run test:chrome

# run tests in IE
npm run test:ie
```


Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- IE 11+
- Firefox 32+
- Chrome 38+


Bundle for the Browser
----------------------

Follow the package install instructions first.

```bash
npm install --save-dev browserify browserify-css
browserify myapp.js -o mybundle.js
```


Usage Examples
--------------

**Note:** This module is fully compatible with Node/Babel/ES6/ES5. Simply
omit the type declarations when using a language other than TypeScript.

A `Widget` is the base class of the phosphor widget hierarchy. A `Panel` is
a convenient Widget subclass which acts as a container for child widgets.
Adding widgets to a panel is simple:

```typescript
let panel = new Panel();
let child1 = new Widget();
let child2 = new Widget();
panel.addChild(child1);
panel.addChild(child2);
```

A more realistic scenario would involve custom widgets:

```typescript
class LogWidget extends Widget {
  ...
}

class ControlsWidget extends Widget {
  ...
}

let logPanel = new Panel();
let log = new LogWidget();
let controls = new ControlsWidget();
logPanel.addChild(log);
logPanel.addChild(controls);
```

A `Widget` has a `node` property, which is a standard DOM node. For simple
UIs or custom generated content, the content nodes can be added directly to
the widget's `node`:

```typescript
let widget = new Widget();
let div = document.createElement('div');
widget.node.appendChild(div);
```

A `Widget` also inherits from
[NodeWrapper](https://github.com/phosphorjs/phosphor-nodewrapper),
which means setting the node id and toggling CSS classes is simple:

```typescript
let widget = new Widget();
widget.id = 'main';
widget.addClass('foo');
widget.addClass('bar');
widget.removeClass('foo');
widget.toggleClass('bar', false);
```

A widget can be attached to the DOM with the `attach` method, which ensures
that the proper attachment messages are dispatched to the widget hierarchy.

```typescript
let widget = new Widget();
widget.attach(document.body);
```

Likewise, a widget can be detached from the DOM with the `detach` method,
though it is more common to simply `dipose` of the widget.

```typescript
let widget = new Widget();
widget.attach(document.body);

// sometime later...
widget.detach();

// or almost equivalently
widget.dispose();
```

The `Widget` class forms the foundation for building complex and custom
widgets; while the `Layout`, `AbstractPanel` and `Panel` classes make it
simple to create container widgets which cover a vast swath of use cases. The
amount of flexibility offered by these base classes means the user can create
nearly any application using content generated by nearly any framework. The
PhosphorJS project provides several useful widgets and panels out of the box.
Some of the more commonly used are:

- [BoxPanel](https://github.com/phosphorjs/phosphor-boxpanel)
- [DockPanel](https://github.com/phosphorjs/phosphor-dockpanel)
- [GridPanel](https://github.com/phosphorjs/phosphor-gridpanel)
- [Menu](https://github.com/phosphorjs/phosphor-menus)
- [MenuBar](https://github.com/phosphorjs/phosphor-menus)
- [SplitPanel](https://github.com/phosphorjs/phosphor-splitpanel)
- [TabBar](https://github.com/phosphorjs/phosphor-tabs)
- [TabPanel](https://github.com/phosphorjs/phosphor-tabs)
