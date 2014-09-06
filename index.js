#!/usr/bin/env node

'use strict';

var program = require('commander')
  , gulp    = require('gulp')
  , chalk   = require('chalk')
  , exec    = require('exec')

var strings = {
  create: 'Creating new project',
  install: 'Installing dependencies',
  complete: 'Done!'
}

function notify(message) {
  if (!program.quiet)
    console.log(chalk.green(message))
}

function installDependencies(name) {
  notify(strings.install)

  exec('cd ' + name + ' && npm install', function () {
    notify(strings.complete)
  })
}

function newProject(name) {
  notify(strings.create, name)

  gulp.src(['assets/**/*', 'assets/.*'])
    .pipe(gulp.dest(name))
    .on('end', installDependencies.bind(this, name))
}

program
  .version('0.0.0')
  .option('-q, --quiet', 'Hide logging information')

program
  .command('new <name>')
  .description('scaffold out a new app in the current directory')
  .action(newProject)

program.parse(process.argv);
