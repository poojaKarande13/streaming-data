var kafka = require('kafka-node');
const io = require('socket.io')();
const kclient = new kafka.Client("localhost:2181");

io.on('connection', (client) => {
  client.on('subscribeToTopic', (interval) => {
    console.log('client is subscribing to timer with unit key ', interval);

    const topics = [
        {
            topic: "streaming-data"
        }
    ];

    const options = {
        autoCommit: false,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024,
        encoding: "buffer",
        fromOffset: false
    };

    const consumer = new kafka.HighLevelConsumer(kclient, topics, options);

    consumer.on("message", function(message) {
      var buf = new Buffer(message.value, "binary");
      var decodedMessage = JSON.parse(buf.toString());
      client.emit(decodedMessage['unit_key'], decodedMessage);
      console.log(decodedMessage);
    });

    consumer.on("error", function(err) {
        console.log("error", err);
    });

    process.on("SIGINT", function() {
        consumer.close(true, function() {
            process.exit();
        });
    });
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);


// 'use strict';
// const io = require('socket.io')();
// var kafka = require('kafka-node');
//
// var Consumer = kafka.Consumer;
// var Offset = kafka.Offset;
// var Client = kafka.Client;
// var argv = require('optimist').argv;
// var topic = 'streaming-data';
//
// var client = new Client('localhost:9092');
// var topics = [{ topic: topic, partition: 1 }, { topic: topic, partition: 0 }];
// var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
//
// var consumer = new Consumer(client, topics, options);
// var offset = new Offset(client);
//
// consumer.on('message', function (message) {
//   console.log(message);
// });
//
// consumer.on('error', function (err) {
//   console.log('error', err);
// });

// io.on('connection', (client) => {
//   client.on('subscribeToTopic', (interval) => {
//     console.log('client is subscribing to timer with unit key ', interval);
//     consumer.on('message', function (message) {
//       console.log(message);
//       client.emit('timer', Math.random());
//     });
//
//     consumer.on('error', function (err) {
//       console.log('error', err);
//     });
//
//     /*
//     * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
//     */
//     consumer.on('offsetOutOfRange', function (topic) {
//       topic.maxNum = 2;
//       offset.fetch([topic], function (err, offsets) {
//         if (err) {
//           return console.error(err);
//         }
//         var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
//         consumer.setOffset(topic.topic, topic.partition, min);
//       });
//     });
//   });
// });


// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);
