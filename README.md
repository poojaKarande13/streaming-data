
## Visualization of Kafka streams on real time Charts

Kafka, Socket.io, Node, ReactJS, FusionCharts and ECharts

##### How difficult it is to plot a real time chart from streaming data?

There are many open source streaming platform and also there are abundant open source charting libraries. However, it seems difficult to make a realtime chart of streaming data given the speed at which data is collected.

##### Question like:
1. What will be the refresh interval of the page? Problems with too small or too big intervals are quite evident.
2. Will the chart crash if the data is collected at the rate milli seconds?

##### How do we stitch them together to plot event data in realtime?

In this experiment we will plot streaming data from Kafka topics directly onto browser using Fusion Charts and ECharts.

### Architecture

The source of the data are sensors on the field, which send data to server via API calls. These APIs act as a kafka producer and insert data into the Kafka topics. A Kafka consumer reads data from the topic, filters it and sends it to a socket which act as a publisher of the data to the browser. One of the easiest way to create sockets is with the help of the Socket.IO library.
It is best for realtime bidirectional communication with the browser and server.

You can read more about it here https://socket.io/docs/

At the subscriber end we have NodeJS and React app which reads the data and plots it as charts using any charting library.
For the purpose of experiment I have used both Fusion Charts and ECharts.



Then a NodeJS app subscribes to the socket and




You can download the source code of this experiment from this github link:

### Installation

1. Download Confluent : https://www.confluent.io/download/
2. Install Node.js and npm (use node version manager)
3. Clone my repo : https://github.com/poojaKarande13/streaming-data

### Quickstart

npm start

Start Confluent

./bin/confluent start

node producer.js

node consumer.js

Go To

http://localhost:3000/

### References

Kafka consumer config : enable.auto.commit

https://medium.com/@danieljameskay/understanding-the-enable-auto-commit-kafka-consumer-property-12fa0ade7b65
