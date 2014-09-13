#!/usr/bin/env node

'use strict';

var program = require('commander')
  , gulp    = require('gulp')
  , chalk   = require('chalk')
  , exec    = require('exec')
  , pjson   = require('./package.json')

var messages = {
  create: 'Creating new project',
  install: 'Installing dependencies',
  complete: 'Done!',
  esnext: 'including esnext'
}

var sources = {
  base: __dirname + '/assets/base/**/*',
  esnext: __dirname + '/assets/esnext/**/*'
  // gitignore: __dirname + '/assets/.gitignore'
}

function notify(message) {
  if (!program.quiet)
    console.log(chalk.green(message))
}

function installDependencies(name) {
  notify(messages.install)

  exec('cd ' + name + ' && npm install', function () {
    notify(messages.complete)
  })
}

function newProject(name) {
  notify(messages.create)
  var paths = [sources.base]

  if (program.esnext) {
    notify(messages.esnext)
    paths.push(sources.esnext)
  }

  gulp.src(paths, {dot: true})
    .pipe(gulp.dest(process.cwd() + '/' + name))
    .on('end', installDependencies.bind(this, name))
}

program
  .version(pjson.version)
  .option('-q, --quiet', 'Hide logging information')
  .option('-e, --esnext', 'Add esnext support through the traceur compiler')

program
  .command('new <name>')
  .description('Scaffold out a new app with given name')
  .action(newProject)

program.parse(process.argv)
