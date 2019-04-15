//https://github.com/ttezel/twit
const fs = require('fs')
const path = require('path')
const http = require('http')

let assert = require('assert');
let util = require('util');

let querystring = require('querystring');
let fetch = require('node-fetch')
let Twit = require('twit')


function handleError(error) {
  console.error('response status:', error.statusCode);
  console.error('data:', error.data);
}

//get date string for today's date (e.g. '2011-01-01')
function datestring () {
  let d = new Date(Date.now() - 5*60*60*1000);  //est timezone
  return d.getUTCFullYear()   + '-'
     +  (d.getUTCMonth() + 1) + '-'
     +   d.getDate();
};


function randIndex (arr) {
  let index = Math.floor(arr.length*Math.random());
  return arr[index];
}

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)


const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args

let args = process.argv
let [cmd, scp, ...opts] = args

// action

let params = [], action = opts[0] || 'help'
if (opts.length === 0) {    // action: help

  action = 'help'

} else {

  params = opts.slice(1)

}


//  T
var T = function (pars={}) {
  if (!(this instanceof T)) {
    return new T(pars)
  }
  let self = this
  this.pars = pars
}

let Q = function(pars={}) {
  this.T = new T(pars)
}

Q.prototype.blogs = function () {
  if (1 && 1) console.log(' **************** blogs')

  let header = {
    templateKey: 'blog-post'
    title: '#eon tiod'
    date: '2018-08-14T15:04:10.000Z'
    description: 'beat coding'
    tags: ['rythm']
  }
  let content = {
  }
  let blog = {header, content}

}


// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/gatsby-project-structure.md


let R = new Q()
if (0) {

} else  { //if (T[action] !== undefined) {
if (1 && 1) console.log('R', R)

  R[action](...params)

}




