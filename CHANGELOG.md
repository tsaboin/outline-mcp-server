## [5.0.1](https://github.com/mmmeff/outline-mcp-server/compare/v5.0.0...v5.0.1) (2025-06-11)


### Bug Fixes

* **cli:** fix CLI missing shebang ([8c320de](https://github.com/mmmeff/outline-mcp-server/commit/8c320dea175add923291887371fbe4daa0ab5afd))

# [5.0.0](https://github.com/mmmeff/outline-mcp-server/compare/v4.12.2...v5.0.0) (2025-06-11)


### Bug Fixes

* **docs:** correct API URL env var name in README ([a2854f8](https://github.com/mmmeff/outline-mcp-server/commit/a2854f8ae9bea56d2183dc93c59187fe32882ce0))


* BREAKING CHANGE: feat(server): Migrate SSE and STDIO transports to single Streamble HTTP endpoint ([4012979](https://github.com/mmmeff/outline-mcp-server/commit/4012979a428212fa7c7c2abb28bea8dde670c23b))


### BREAKING CHANGES

* chore(deps): Updated minimum node version to 20
* refactor(args): Removed --port CLI flag in favor of OUTLINE_MCP_PORT env var
chore(deps): updated dependencies across the package
chore(test): removed busted janky e2e tests until they can be rewritten against mcp-inspector's CLI as integ
perf(server): swapped out node runtime with bun for bin

## [4.12.3](https://github.com/mmmeff/outline-mcp-server/compare/v4.12.2...v4.12.3) (2025-03-21)


### Bug Fixes

* **docs:** correct API URL env var name in README ([a2854f8](https://github.com/mmmeff/outline-mcp-server/commit/a2854f8ae9bea56d2183dc93c59187fe32882ce0))

## [4.12.2](https://github.com/mmmeff/outline-mcp-server/compare/v4.12.1...v4.12.2) (2025-03-16)


### Bug Fixes

* failure to dynamically load tools when running transpiled code ([b22061c](https://github.com/mmmeff/outline-mcp-server/commit/b22061c138d82bcddecaab0ae59a17f2f6ade312))

## [4.12.1](https://github.com/mmmeff/outline-mcp-server/compare/v4.12.0...v4.12.1) (2025-03-16)


### Bug Fixes

* restore src->build config to not break everything else ([c927dda](https://github.com/mmmeff/outline-mcp-server/commit/c927dda37ad63b667fb9a2b897d1217acf3fd9ae))

# [4.12.0](https://github.com/mmmeff/outline-mcp-server/compare/v4.11.0...v4.12.0) (2025-03-16)


### Features

* Add createTemplateFromDocument too ([9840ae1](https://github.com/mmmeff/outline-mcp-server/commit/9840ae12260891e16a6eaef1ced2da0a00f7d598))

# [4.11.0](https://github.com/mmmeff/outline-mcp-server/compare/v4.10.1...v4.11.0) (2025-03-16)


### Features

* Add natural language endpoint support ([3b804ff](https://github.com/mmmeff/outline-mcp-server/commit/3b804ff40ce1f5815cf9f7c213889e2f2a1f4451))

## [4.10.1](https://github.com/mmmeff/outline-mcp-server/compare/v4.10.0...v4.10.1) (2025-03-16)


### Bug Fixes

* build correct tools list response using mcp lib types ([55c15d4](https://github.com/mmmeff/outline-mcp-server/commit/55c15d444698993bb2a5d7f3250c09207bc1663d))

# [4.10.0](https://github.com/mmmeff/outline-mcp-server/compare/v4.9.0...v4.10.0) (2025-03-16)


### Bug Fixes

* prevent race condition preventing tools from properly registering in toolDefinitions ([864a6bb](https://github.com/mmmeff/outline-mcp-server/commit/864a6bb915943017fdbd99b12baa73eed499b0df))


### Features

* expand parameter support for listDocuments ([f74daeb](https://github.com/mmmeff/outline-mcp-server/commit/f74daeb0789f29766dd95f6a6aa8c91875b370dd))

# [4.9.0](https://github.com/mmmeff/outline-mcp-server/compare/v4.8.3...v4.9.0) (2025-03-16)


### Features

* adopt semantic release ([417b0c1](https://github.com/mmmeff/outline-mcp-server/commit/417b0c1653cac61ccd79ec8acddacb75bec1e611))
