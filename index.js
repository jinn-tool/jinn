#!/usr/bin/env node

'use strict';

//dependencies
var program = require('commander')
  , gulp    = require('gulp')
  , chalk   = require('chalk')
  , exec    = require('exec')
  , pjson   = require('./package.json')
  , vasync  = require('vasync')

var dependencies = require('./package.json').dependencies
var modules = Object.keys(dependencies).filter(function (dep) {
  return dep.match(/^jinn-.*$/)
})

//magic strings
var messages = {
  logo: '============J==I==N==N============',
  create: 'Creating new project ',
  installModules: 'Installing modules',
  installDependencies: 'Installing dependencies',
  complete: 'Project created, run cd '
}

//paths
var sources = {
  base: __dirname + '/assets/base/**/*'
}

function error(message) {
  console.error(chalk.red(message))
}

function notify(message) {
  console.log(chalk.cyan('-->',message))
}

function installDependencies(appname, callback) {
  console.log(chalk.green(messages.installDependencies))

  exec('cd ' + appname + ' && npm install', callback)
}

function installModules(appname, callback) {
  console.log(chalk.green(messages.installModules))

  var jinnObject = {
    appname: appname,
    log: notify,
    options: program
  }

  var pipeline = {
    'func': function (module, done) {
      require(module)(jinnObject, done)
    },
    'inputs': modules
  }

  vasync.forEachPipeline(pipeline, function (err) {
    if (err) return error(err.message)
    installDependencies(appname, callback)
  })
}

function newProject(appname) {
  console.log(chalk.bold.white.bgMagenta(messages.logo))
  console.log(chalk.green(messages.create + appname), '\n')

  gulp.src([sources.base], {dot: true})
    .pipe(gulp.dest(process.cwd() + '/' + appname))
    .on('end', function () {
      installModules(appname, function () {
        console.log(chalk.green('\n' + messages.complete + appname))
        console.log(chalk.bold.white.bgMagenta(messages.logo))
        process.exit(0)
      })
    })
}

program
  .version(pjson.version)

//register each modules command line flags
modules.forEach(function (module) {
  var mod = require(module)
  program.option(mod.command.flags, mod.command.description)
})

  // DONE
  // .option('-j, --jshint', 'Add jshint support with opionated defaults')
  // .option('-E, --env', 'Add env support via the envoodoo module')
  // .option('-d, --editorconfig', 'Add editorconfig support with opionate defaults')
  // .option('-u, --test', 'Adds a testem based test harness for badass testing')
  // .option('-G, --gitignore', 'Adds a gitignore file')

  // TODO
  // .option('-e, --esnext', 'Add esnext support through the traceur compiler')
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
