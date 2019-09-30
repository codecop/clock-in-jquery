# Clock-in kata JavaScript/JQuery

An implementation of Clock-in kata in JavaScript. A project to practice asynchronous programming using Promises and testing them., done in a Randori-styled [Coding Dojo](http://codingdojo.org/WhatIsCodingDojo/), several sessions a 4 hours.

## Installation

This is a JavaScript/NodeJS/[npm](https://www.npmjs.com/) project.
The `src` is legacy ES5 and uses JQuery promises.
The tests use [Mocha](https://mochajs.org/) and [Sinon.JS](http://sinonjs.org/).

* Verify your Node installation with `npm --version`.
* Run `npm install` to install the required packages.
* Run `npm test` to verify your setup and run the tests. You should see several green tests.

## Assignment

Copied from [Wolfram Kriesing's Clock-in kata](https://github.com/wolframkriesing/clock-in-kata/blob/master/README.md):

A time tracking tool, that optionally also accepts GPS positions.
Implement the collecting of all GPS data (using promises) and sending to the server using some asynchronous method, like XHR or fetch (using promises too).
Implement a `clockIn()` function that returns a promise and works as the diagrams below show.

Or in other words: the "boss" can determine

1) if only times shall be tracked, without any GPS position recoding (one async action, the XHR) or
2) GPS can be optionally added to the XHR data to be sent, getting GPS is async too,
3) require GPS data to be sent with the XHR

### Where to start

* start with case 1), the simplest
* mock/stub the actual XHR and build all cases including error cases that might happen when sending an XHR
* mock/stub the GPS-data retrieval, implement case 2), watch out there are multiple execution paths
* case 3) including retrying should be a piece of cake now
* prevent that any test times out, ensure that all Promise-paths are tested

### Next steps

If you want to get more challenging you can go the next steps like this:

* search for a library that makes testing with Promises easier
* use one or many library to find out which one suites best your needs
* mock that getting retrieving GPS data takes very long, trigger a time out
  and report it to the user
* write tests that verify the timing of the things happening, e.g.
  that the clock-in call NEVER starts before the gps-retrieval had
  finished

## Sessions

### 1: 2019-09-10

* 2,5 h ... introduction to Node, project setup, first 2 test cases

Developer Joke: [Weight of node_modules](https://indexandmain.com/post/shrink-node-modules-with-refining/node_modules_meme.png)

Retrospective

* good to have Code Cop back
* useful git discussion |||||
* we did not use JS long time in the sessions
* seen how to mock and stub in JS
* trying new stuff in JS (NodeJS) good ||||
* promises topic good

### 2: 2019-09-24

* 2 h ... introduce linter, refactor callbacks towards promises
* 2 h ... add timestamp and GPS coordinates

Developer Joke: [Real.I mean the real. Perfection.](https://i.redd.it/05b6u19pseoz.png)

Retrospective

* Pretty intense, tech (Jquery) is more a problem than C#
* I liked it.
* Perfection with the linter. ||
  * Type annotations make sense.
  * if we use it ;-)
* I liked the new stuff. ||
* I like new VS Code plugins ||||
* Was overwhelmed, lost in changes.
* I was lost with promises. ||
* Two test cases nice.
* Quite hard session, promise is difficult.
* New Phone timer does not stop - good. |||

### 3: 2019-10-08

* x h ... tbd

Developer Joke: [Html5 Mask](https://twitter.com/nigel_ssj9/status/905016757483487235)

Retrospective

* tbd

### License

This work is licensed under a [New BSD License](http://opensource.org/licenses/bsd-license.php), see `license.txt` in repository.
