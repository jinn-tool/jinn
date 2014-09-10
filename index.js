#!/usr/bin/env node

'use strict';

var program = require('commander')
  , gulp    = require('gulp')
  , chalk   = require('chalk')
  , exec    = require('exec')
  , pjson   = require('./package.json')

var strings = {
  create: 'Creating new project',
  install: 'Installing dependencies',
  complete: 'Done!'
}

var paths = {
  basefiles: __dirname + '/assets/**/*',
  dotfiles: __dirname + '/assets/.*',
  gitignore: __dirname + '/assets/.gitignore'
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
  notify(strings.create)

  gulp.src([paths.basefiles, paths.dotfiles, paths.gitignore])
    .pipe(gulp.dest(process.cwd() + '/' + name))
    .on('end', installDependencies.bind(this, name))
}

program
  .version(pjson.version)
  .option('-q, --quiet', 'Hide logging information')

program
  .command('new <name>')
  .description('Scaffold out a new app with given name')
  .action(newProject)

program.parse(process.argv);
