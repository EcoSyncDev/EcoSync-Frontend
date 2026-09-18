import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Executa os módulos reais com o alias do projeto, sem gerar arquivos compilados.
// Cada loader tem seu próprio cache e ambiente para isolar a configuração da API.
export function createModuleLoader(env = {}) {
  const modules = new Map();
  const testProcess = { env: { ...env } };

  function load(specifier) {
    if (!specifier.startsWith("@/")) throw new Error(`Unsupported test import: ${specifier}`);
    if (modules.has(specifier)) return modules.get(specifier).exports;
    const file = new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url);
    const source = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
    }).outputText;
    const loadedModule = { exports: {} };
    modules.set(specifier, loadedModule);
    vm.compileFunction(source, ["require", "module", "exports", "process"], { filename: file.pathname })(load, loadedModule, loadedModule.exports, testProcess);
    return loadedModule.exports;
  }

  return load;
}
