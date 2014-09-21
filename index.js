#!/usr/bin/env node

'use strict';

//dependencies
var program = require('commander')
  , gulp    = require('gulp')
  , chalk   = require('chalk')
  , exec    = require('exec')
  , pjson   = require('./package.json')

//modules
var jshintPlugin       = require('jinn-jshint')
  , gitignorePlugin    = require('jinn-gitignore')
  , envPlugin          = require('jinn-env')
  , editorconfigPlugin = require('jinn-editorconfig')
  , testPlugin         = require('jinn-test')

//magic strings
var messages = {
  create: 'Creating new project',
  install: 'Installing dependencies',
  complete: 'Project created!',
  esnext: 'including esnext'
}

//paths
var sources = {
  base: __dirname + '/assets/base/**/*',
  esnext: __dirname + '/assets/esnext/**/*'
}

function notify(message) {
  console.log(chalk.green('-->',message))
}

function installDependencies(appname) {
  notify(messages.install)

  exec('cd ' + appname + ' && npm install', function () {
    notify(messages.complete)
    process.exit(0)
  })
}

function installModules(appname) {
  var jinnObject = {
    appname: appname,
    log: notify,
    options: program
  }

  jshintPlugin(jinnObject, function () {
    gitignorePlugin(jinnObject, function () {
      envPlugin(jinnObject, function() {
        editorconfigPlugin(jinnObject, function() {
          testPlugin(jinnObject, function() {
            installDependencies(appname)
          })
        })
      })
    })
  })
}

function newProject(appname) {
  console.log(chalk.green(messages.create))

  gulp.src([sources.base], {dot: true})
    .pipe(gulp.dest(process.cwd() + '/' + name))
    .on('end', function () {
      installModules(appname)
    })
}

program
  .version(pjson.version)
  .option('-e, --esnext', 'Add esnext support through the traceur compiler')
  .option('-j, --jshint', 'Add jshint support with opionated defaults')
  .option('-E, --env', 'Add env support via the envoodoo module')
  .option('-d, --editorconfig', 'Add editorconfig support with opionate defaults')
  .option('-u, --test', 'Adds a testem based test harness for badass testing')

  // TODO
  // .option('-h, --heroku', '')
  // .option('-b, --browserify', '')
  // .option('-c, --coffee', '')
  // .option('-i, --iced', '')
  // .option('-x, --circle', '')
  // .option('-t, --travis', '')
  // .option('-o, --coverage', '')
  // .option('-a, --coveralls', '')
  // .option('-r, --readme', '')
  // .option('-g, --github', '')
  // .option('-l, --license', '')
  // .option('-n, --client', '')
  // .option('-s, --server', '')
  // .option('-p, --npm', '')

program
  .command('new <appname>')
  .description('Scaffold out a new app with given name')
  .action(newProject)

program.parse(process.argv)
