// Copyright (C) 2020 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Explicit iterator closing if Promise.resolve is not callable
esid: sec-promise.all
info: |
    5. Let result be PerformPromiseAll(iteratorRecord, C, promiseCapability).
    6. If result is an abrupt completion,
        a. If iteratorRecord.[[Done]] is false, let result be
           IteratorClose(iterator, result).
        b. IfAbruptRejectPromise(result, promiseCapability).

    [...]

    Runtime Semantics: PerformPromiseAll

    [...]
    5. Let promiseResolve be ? Get(constructor, "resolve").
    6. If ! IsCallable(promiseResolve) is false, throw a TypeError exception.
    [...]

flags: [async]
features: [Symbol.iterator, computed-property-names, arrow-function]
---*/

let returnCount = 0;
const iter = { 
  [Symbol.iterator]: function() {
    return {
      return: function() {
        ++returnCount;
      }
    };
  }
}

Promise.resolve = "certainly not callable";

Promise.all(iter).then(() => {
  $DONE('The promise should be rejected, but was resolved');
}, (reason) => {
  assert(reason instanceof TypeError);
}).then($DONE, $DONE);

assert.sameValue(returnCount, 1);
