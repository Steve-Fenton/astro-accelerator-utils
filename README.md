# Astro Accelerator Utils

[![Test](https://github.com/Steve-Fenton/astro-accelerator-utils/actions/workflows/build-astro.yml/badge.svg)](https://github.com/Steve-Fenton/astro-accelerator-utils/actions/workflows/build-astro.yml)

Utility classes for Astro Accelerator

[![npm](https://img.shields.io/npm/v/astro-accelerator-utils?color=blue&style=plastic)](https://www.npmjs.com/package/astro-accelerator-utils/)
[![npm](https://img.shields.io/npm/dm/astro-accelerator-utils?style=plastic)](https://www.npmjs.com/package/astro-accelerator-utils/)

## Overview

This package is tested with CucumberJS. The tests are written in the features folder and are run using the `pnpm test` command.

See [TEST.md](TEST.md) for detailed test results and coverage information.

## Update Type Information

Run the command:

```bash
pnpm types
```

## Running Tests

Run the command:

```bash
pnpm test
```

To generate a coverage report in TEST.md, run:

```bash
pnpm test:report
```

## Create new version

Run the command:

```bash
pnpm refresh
```

This updates dependencies, increments the version number, and re-runs types and tests. If successful, committing the change updates the package on NPM.
