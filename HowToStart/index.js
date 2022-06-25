// for debugging exec with :
// node --inspect index.js

// for profiling exec with :
// node --prof index.js 

// for Readable profiling file exec with :
// node --prof-process isolate-0xnnnnnnn-nnnnnn-v8.log > process.txt


import http from 'http';

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(1337);