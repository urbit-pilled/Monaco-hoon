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
domain Mapping
{
	Component ::= new (id: Integer, utilization: Real).
	Processor ::= new (id: Integer).
	Mapping   ::= new (c: Component, p: Processor).

	badMapping :- p is Processor,
				        s = sum(0.0, { c.utilization | 
                               c is Component, Mapping(c, p) }), s > 100.
}`;

// document.getElementById('app').innerHTML = "text";


(async () => {
    Theme.load(require("./theme.json"));//"monaco-tree-sitter/themes/tomorrow")); //to use the 'tomorrow' theme
  
    await Parser.init();
    const parser = new Parser();
    const Lang = await Parser.Language.load('tree-sitter-formula.wasm');
    parser.setLanguage(Lang);
  
    const language = new Language(require("./grammar.json"));
    await language.init("http://localhost:9000/tree-sitter-formula.wasm", Parser);
  
  
    window.editor = Monaco.editor.create(document.querySelector("#app"), {
      value: formulaCode,
      language: "formula"
    });
  
    window.editor = editor;
    window.monacoTreeSitter = new MonacoTreeSitter(Monaco, editor, language);
  })();
