[![NPM](https://nodei.co/npm/jinn.png?compact=true)](https://nodei.co/npm/jinn/)

[![Media Suite](http://mediasuite.co.nz/ms-badge.png)](http://mediasuite.co.nz)

jinn
====

A nodejs project scaffolding tool

## Install

```
npm install -g jinn
```

## Basic usage

```
jinn new <projectname>
cd <projectname>
```

This will create a project directory called <projectname> and scaffold up
the project files necessary to get going with a basic node project.

## Commands

### New

`new <projectname>`

Scaffold up a new project with given `<projectname>`

## Options

### ES6

`-e, --esnext`

Add esnext support via the traceur compilier

### Help

`-h, --help`

Show help documentation

## Conventions

### Directory structure
```
- projectname
  - test
    - *.spec.js
  - lib
    - *.js
  - index.js
```

### Meta files

We include various metafiles with project scaffolds. Browse the assets folder in the repo for more information.

- package.json
  - includes necessary dependencies for test setup and es6 transpiling
- .gitignore
  - common node ignores plus we ignore .env file (but not .env-example)
- .jshintrc and .jshintignore
  - jshint setup, suits our tastes, tweak to your own needs
- .editorconfig
  - [editorconfig](http://editorconfig.org/)
- .env and .env-example
  - we use .env files to manage project environment variables. We use the module [envoodoo](https://www.npmjs.org/package/envoodoo) to include these in index.js
  - .env files usually include sensitive information such as database connection details so it is ignored in .gitignore so you should commit the .env-example file to the repo with example values instead

### Testing

We use [testem](https://github.com/airportyh/testem) and [mocha](http://mochajs.org/) to provide a kick ass test environment. From the root
of the project just run:
```
npm test
``` 
Then start adding tests to the test folder.

Tests must be named:

```
<somename>.spec.js
``` 

Testem will rerun tests whenever you add new test specs or save existing ones.

