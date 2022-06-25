'use strict'

function ExecCallbacksWhenAsyncProcedureStarts(whenStartsAsyncProcedureCb) {
  // the procedure that will handle the incoming callbacks  
  var callbackHandler = FirstTimeCalledFn
  return function (callback) {
    callbackHandler(callback)
  }

  function FirstTimeCalledFn (callback) {
    //callback stacks to be called when async procedure starts
    var stack = [callback]
    //Once called for the first time, 
    //the callbackHandler is set to fill the stack with the incoming callbacks
    callbackHandler = function (cb) {
        stack.push(cb)
    }
    
    //Once AsyncProcedure is started, this function is called
    whenStartsAsyncProcedureCb(function (err) {
        //AsyncProcedure started callback arguments
        var args = arguments

        var thereWasAAsyncProcedureProblem = isError(err);
        if(thereWasAAsyncProcedureProblem) {
            //If there was a AsyncProcedure problem,
            //the process is reset to the first callbackHandler
            //so the incoming call will wait for the AsyncProcedure again
            //and will stack the callbacks until the AsyncProcedure is started
            callbackHandler = FirstTimeCalledFn
        } else{
            //If there was no AsyncProcedure problem,
            // all incoming callbacks are directly called
            // by sending them to the bottom of the current execution cycle
            // to be executed with the AsyncProcedure started callback arguments
            callbackHandler = function (cb) {
                process.nextTick(cb,args);
            }
        }
        //No matter if there was a AsyncProcedure problem or not,
        //all callbacks in the stack are called
        // by sending them to the bottom of the current execution cycle
        // to be executed with the AsyncProcedure started callback arguments
        DispatchStack(args);
    });

    function DispatchStack (args) {
        while (stack.length) {
            let firstCb = stack.shift();
            //send the top stack callback to the bottom of the current execution cycle
            process.nextTick(firstCb,args);
        }
    }
}
}

function isError (err) {
  return Object.prototype.toString.call(err) === '[object Error]'
}


//EXAMPLE OF USE

import http from 'http';
import * as SocketIO from 'socket.io';
let io = SocketIO(http);

let getIO = ExecCallbacksWhenAsyncProcedureStarts(function (onStartCb) {
    io.on('connection', function (socket) {
        onStartCb(null,socket);
    });
});

let ListenOnIO = function (event, callback) {
    getIO(function (socket) {
        socket.on(event, callback);
    } );
};

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});


ListenOnIO('event1', function (socketData) {
    console.log('event1', socketData);
});


ListenOnIO('event2', function (socketData) {
    console.log('event2', socketData);
});





