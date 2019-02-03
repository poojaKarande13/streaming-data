var kafka = require('kafka-node');
const kclient = new kafka.Client("localhost:2181", "my-client-id", {
    sessionTimeout: 300,
    spinDelay: 100,
    retries: 2
});

const producer = new kafka.HighLevelProducer(kclient);
producer.on("ready", function() {
    console.log("Kafka Producer is connected and ready.");
});

// For this demo we just log producer errors to the console.
producer.on("error", function(error) {
    console.error(error);
});

const KafkaService = {
    sendRecord: ({ data}, callback = () => {}) => {
        const event = {
            timestamp: new Date(),
            data: data
        };

        const buffer = new Buffer.from(JSON.stringify(event));
        //console.log(event);
        // Create a new payload
        const record = [
            {
                topic: "streaming-data",
                messages: buffer,
                attributes: 1 /* Use GZip compression for the payload */
            }
        ];

        //Send record to Kafka and log result/error
        producer.send(record, callback);
    }
};

var count = 0
setInterval(() => {
  KafkaService.sendRecord({data: Math.random()});
  count = count + 1;

}, 1000);
