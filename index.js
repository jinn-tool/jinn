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
  .option('-h, --heroku', '')
  .option('-b, --browserify', '')
  .option('-c, --coffee', '')
  .option('-i, --iced', '')
  .option('-j, --jshint', '')
  .option('-x, --circle', '')
  .option('-t, --travis', '')
  .option('-o, --coverage', '')
  .option('-a, --coveralls', '')
  .option('-g, --github', '')
  .option('-l, --license', '')
  .option('-E, --env')
  .option('-d, --editorconfig', '')
  .option('-r, --readme', '')
  .option('-u, --test', '')
  .option('-n, --client', '')
  .option('-s, --server', '')
  .option('-p, --npm', '')

program
  .command('new <appname>')
  .description('Scaffold out a new app with given name')
  .action(newProject)

program.parse(process.argv)
