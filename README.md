jinn
====

A nodejs project scaffolding tool

## Install

`npm install -g jinn`

## Usage

`jinn new <projectname>`
`cd <projectname>`

This will create a project directory called <projectname> and scaffold up
the project files necessary to get going with a basic node project.

## Conventions

### Directory structure

projectname
  test
    *.spec.js
  lib
    *.js
  index.js

### Testing

We use testem and mocha to provide a kick ass test environment. From the root
of the project just run `npm test` and start adding tests to the test folder.
Tests must be named `<somename>.spec.js` Testem will rerun tests whenever you
add new test specs or save existing ones.

### ES6 by default

index.js contains the code necessary to bootstrap the rest of the app with
the ability to write code in ES6 via the traceur project. See index.js for
further information
