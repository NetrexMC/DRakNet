// # // This is typesharp code
// # import typesharp;
// # import typesharp.engines.v8_transpiler as v8;
// # import std.fs;
// #
// # const engine = new v8.utils.Isolate();
// # const code: v8.Scope = typesharp.cli_core.readCombineSync("./src", {
// #     context: super,
// #     excludes: ["current_context"]
// # });
// # const byteCode = v8.script.compile(code);
// # @compiler("compile", "ts-v8", bytecode);