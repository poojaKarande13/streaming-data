import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToKafkaSocket(cb, unit_key) {
	//var unit_key = '4b6t2f1te9';
	// subscribe to socket with name as unit_key
  socket.on('broadcast', data => cb(null, data));
  // Request to start kafka consumer
  //socket.emit('subscribeToTopic', unit_key);
}


export { subscribeToKafkaSocket };
