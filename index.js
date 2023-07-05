// document.getElementById('app').innerHTML = "text";

import "./styles.css";
import "./patch-fetch.js";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as Parser from "web-tree-sitter";
import { 
  Language, 
  Theme, 
  MonacoTreeSitter, 
  highlight } from "monaco-tree-sitter";


const formulaCode = `
:: Example program from hoon school guide https://developers.urbit.org/guides/core/hoon-school/K-doors#exercise-display-cards 
!:
|=  [msg=tape steps=@ud]
=<
=.  msg  (cass msg)
:-  (shift msg steps)
    (unshift msg steps)
::
|%
++  alpha  "abcdefghijklmnopqrstuvwxyz"
::  Shift a message to the right.
::
++  shift
    |=  [message=tape steps=@ud]
    ^-  tape
    (operate message (encoder steps))
::  Shift a message to the left.
::
++  unshift
    |=  [message=tape steps=@ud]
    ^-  tape
    (operate message (decoder steps))
::  Rotate forwards into encryption.
::
++  encoder
    |=  [steps=@ud]
    ^-  (map @t @t)
    =/  value-tape=tape  (rotation alpha steps)
    (space-adder alpha value-tape)
::  Rotate backwards out of encryption.
::
++  decoder
    |=  [steps=@ud]
    ^-  (map @t @t)
    =/  value-tape=tape  (rotation alpha steps)
    (space-adder value-tape alpha)
::  Apply the map of decrypted->encrypted letters to the message.
::
++  operate
    |=  [message=tape shift-map=(map @t @t)]
    ^-  tape
    %+  turn  message
    |=  a=@t
    (~(got by shift-map) a)
::  Handle spaces in the message.
::
++  space-adder
    |=  [key-position=tape value-result=tape]
    ^-  (map @t @t)
    (~(put by (map-maker key-position value-result)) ' ' ' ')
::  Produce a map from each letter to its encrypted value.
::
++  map-maker
    |=  [key-position=tape value-result=tape]
    ^-  (map @t @t)
    =|  chart=(map @t @t)
    ?.  =((lent key-position) (lent value-result))
    ~|  %uneven-lengths  !!
    |-
    ?:  |(?=(~ key-position) ?=(~ value-result))
    chart
    $(chart (~(put by chart) i.key-position i.value-result), key-position t.key-position, value-result t.value-result)
::  Cycle an alphabet around, e.g. from
::  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' to 'BCDEFGHIJKLMNOPQRSTUVWXYZA'
::
++  rotation
    |=  [my-alphabet=tape my-steps=@ud]
    =/  length=@ud  (lent my-alphabet)
    =+  (trim (mod my-steps length) my-alphabet)
    (weld q p)
--
`;

(async () => {
    Theme.load(require("./theme-tomorrow.json"));
  
    await Parser.init();
    const parser = new Parser();
    const Lang = await Parser.Language.load('tree-sitter-hoon.wasm');
    parser.setLanguage(Lang);
  
    const language = new Language(require("./grammar.json"));
    await language.init("http://localhost:9000/tree-sitter-hoon.wasm", Parser);
  
  
    window.editor = Monaco.editor.create(document.querySelector("#app"), {
      value: formulaCode,
      language: "hoon",
      automaticLayout: true,
    });
  
    window.editor = editor;
    window.monacoTreeSitter = new MonacoTreeSitter(Monaco, editor, language);
  })();
