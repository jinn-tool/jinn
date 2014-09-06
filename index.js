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

  gulp.src([__dirname + '/assets/**/*', __dirname + '/assets/.*'])
    .pipe(gulp.dest(process.cwd() + '/' + name))
    .on('end', installDependencies.bind(this, name))
}

program
  .version(pjson.version)
  .option('-q, --quiet', 'Hide logging information')

program
  .command('new <name>')
  .description('scaffold out a new app in the current directory')
  .action(newProject)

program.parse(process.argv);
