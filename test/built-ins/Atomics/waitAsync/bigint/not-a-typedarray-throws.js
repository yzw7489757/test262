// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-atomics.waitasync
description: >
  Throws a TypeError if the typedArray arg is not a TypedArray object
info: |
  Atomics.waitAsync( typedArray, index, value, timeout )

  1. Return DoWait(async, typedArray, index, value, timeout).

  DoWait ( mode, typedArray, index, value, timeout )

  1. Let buffer be ? ValidateSharedIntegerTypedArray(typedArray, true).

  ValidateSharedIntegerTypedArray ( typedArray [ , waitable ] )

  2. Perform ? RequireInternalSlot(typedArray, [[TypedArrayName]]).

  RequireInternalSlot ( O, internalSlot )

  1. If Type(O) is not Object, throw a TypeError exception.
  2. If O does not have an internalSlot internal slot, throw a TypeError exception.

features: [Atomics.waitAsync, arrow-function, Atomics]
---*/
const poisoned = {
  valueOf() {
    throw new Test262Error('should not evaluate this code');
  }
};

assert.throws(TypeError, () => {
  Atomics.waitAsync({}, 0, 0n, 0);
}, '`Atomics.waitAsync({}, 0, 0n, 0)` throws TypeError');

assert.throws(TypeError, () => {
  Atomics.waitAsync({}, poisoned, poisoned, poisoned);
}, '`Atomics.waitAsync({}, poisoned, poisoned, poisoned)` throws TypeError');
