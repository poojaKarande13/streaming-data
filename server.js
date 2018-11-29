const io = require('socket.io')();
io.on('connection', (client) => {
  client.on('subscribeToTopic', (interval) => {
    console.log('client is subscribing to timer with unit key ', interval);
    setInterval(() => {
      client.emit('timer', Math.random());
      }, interval);
  });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);
