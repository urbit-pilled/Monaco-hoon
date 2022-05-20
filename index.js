
//import loader from "@monaco-editor/loader";
import "./styles.css";
import "./patch-fetch";
import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as Parser from "web-tree-sitter";
import { 
  Language, 
  Theme, 
  MonacoTreeSitter, 
  highlight } from "monaco-tree-sitter";

// import treeSitterCppWasmUrl from "./tree-sitter-cpp.wasm";
import treeSitterCppWasmUrl from "tree-sitter-wasm-prebuilt/lib/tree-sitter-cpp.wasm";
import astyleWasmUrl from "wastyle/dist/astyle.wasm";


const cppCode = `#include <stdio.h
int main()
{
    printf("Hello World");

    return 0;
}`;

(async () => {
  // Theme can be loaded before Parser.init()
  Theme.load(require("monaco-tree-sitter/themes/tomorrow"));

  await Parser.init();
  const language = new Language(require("monaco-tree-sitter/grammars/cpp"));
  await language.init(treeSitterCppWasmUrl, Parser);

  // Uncomment this line for a pure code highlighter
  // return document.body.innerHTML = highlight(cppCode, language, true);

  window.editor = Monaco.editor.create(document.querySelector("#app"), {
    value: cppCode,
    language: "javascript"
    // language: "cpp"
  });

  window.editor = editor;
  window.monacoTreeSitter = new MonacoTreeSitter(Monaco, editor, language);
})();
