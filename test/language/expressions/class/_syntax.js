// Copyright (C) 2018 Leo Balter. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Minimal valid syntax for Classes
esid: sec-class-definitions
info: |
  ClassDeclaration:
    class BindingIdentifier ClassTail

  ClassExpression:
    class BindingIdentifier_opt ClassTail

  ClassTail:
    ClassHeritage_opt { ClassBody_opt }
features: [class]
---*/

var C = class {}
