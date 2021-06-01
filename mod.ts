// # // This is typesharp code
// # import typesharp;
// # import typesharp.engines.v8_transpiler as v8;
// # import { }
// # import std.fs;

// # const engine = new v8.utils.Isolate();
// # const code: string = typesharp.cli_core.readCombineSync("./src", {
// #     context: super,
// #     excludes: ["current_context"]
// # });
// # const byteCode = v8.script.compile(v8.Scope.Default(code));
// # @compiler("compile", "ts-v8", bytecode);