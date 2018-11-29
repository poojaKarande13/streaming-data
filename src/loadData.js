import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToKafkaSocket(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTopic', 1000);
}
export { subscribeToKafkaSocket };
