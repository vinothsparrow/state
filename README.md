# state
Executable finite state machine for TypeScript and JavaScript.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status](https://travis-ci.org/steelbreeze/state.svg?branch=master)](https://travis-ci.org/steelbreeze/state)
[![Code Climate](https://codeclimate.com/github/steelbreeze/state/badges/gpa.svg)](https://codeclimate.com/github/steelbreeze/state)
[![Issue Count](https://codeclimate.com/github/steelbreeze/state/badges/issue_count.svg)](https://codeclimate.com/github/steelbreeze/state)
[![Test Coverage](https://codeclimate.com/github/steelbreeze/state/badges/coverage.svg)](https://codeclimate.com/github/steelbreeze/state/coverage)


> **Notes:**
>
>v7.0.0 is in the works and contains breaking changes but offers considerable performance improvements. As a major release it contains breaking changes, see the [release notes](RELEASES.md) for more information.
>
>@steelbreeze/state the new home for [state.js](https://github.com/steelbreeze/state.js) and the versioning starts here from v6.0.0.

If you like @steelbreeze/state, please star it...

## Install
```shell
npm i @steelbreeze/state
```

## Usage
The API is broken up into two distinct parts:
1. A set of classes that represent a state machine model (State, PseudoState, Region, etc.);
2. An interface to represent an instance of a state machine, which embodies the *active state configuration* of a state machine at runtime. This enables multiple instances adhering to the same state machine model. 

### TypeScript
```typescript
import * as state from "@steelbreeze/state";

// log state entry, exit and trigger event evaluation
state.log.add(message => console.info(message), state.log.Entry | state.log.Exit | state.log.Evaluate);

// create the state machine model
const model = new state.State("model");
const initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
const stateA = new state.State("stateA", model);
const stateB = new state.State("stateB", model);

initial.to(stateA);
stateA.to(stateB).when(trigger => trigger === "move");

// create an instance of the state machine model
let instance = new state.Instance("instance", model);

// send the machine instance a message for evaluation
instance.evaluate("move");
```
### JavaScript
```javascript
var state = require("@steelbreeze/state");

// log state entry, exit and trigger event evaluation
state.log.add(message => console.info(message), state.log.Entry | state.log.Exit | state.log.Evaluate);

// create the state machine model
var model = new state.State("model");
var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
var stateA = new state.State("stateA", model);
var stateB = new state.State("stateB", model);

initial.to(stateA);
stateA.to(stateB).when(trigger => trigger === "move");

// create an instance of the state machine model
var instance = new state.Instance("instance", model);

// send the machine instance a message for evaluation
instance.evaluate("move");
```
### Output
The output of the above code will be:
```shell
instance enter model
instance enter model.model
instance enter model.model.initial
instance leave model.model.initial
instance enter model.model.stateA
instance evaluate string trigger: move
instance leave model.model.stateA
instance enter model.model.stateB
```

## License
MIT License

Copyright (c) 2014-8 David Mesquita-Morris

[npm-image]: https://img.shields.io/npm/v/@steelbreeze/state.svg
[npm-url]:       https://www.npmjs.com/package/@steelbreeze/state
[downloads-image]: https://img.shields.io/npm/dm/@steelbreeze/state.svg
