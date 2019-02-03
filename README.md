# Real time visualization of high-velocity Kafka streams

I built a web app to visualize high velocity real-time Kakfa data stream and it mocks real world IoT projects.

#### Technology stack that I used to build the application:
Kafka, Socket.io, Node, ReactJS, FusionCharts and ECharts


### If you have questions like:
1. I have high velocity data (like IoT sensor data). How do I visualize it in a web environment?
2. How difficult it is to plot a real time chart for high velocity streaming data?
3. What will be the refresh interval of the page/chart? Problems with too small or too big intervals are quite evident.
4. Will the chart crash if the data is collected at very high speed? like in milli seconds?

This is the article for you. I will tell you how I approached this kind of data visualization problem with some theory and a practical example. Also, I will help you understand the architecture behind plotting real-time data using a charting library successfully. By the end of this article, I will show you a working project that you can run on you system locally.

### Introduction & brief about the topic
My name is Pooja Karande and I am a Computer Science and Business Analytics graduate. I've been working in the IoT domain since last few years. Big data, analytics and high intensity/high velocity data processing are the areas of my core interest.

So, what is the importance of real-time data visualization?

I will give you two important examples from different domains where analyzing high speed real time data is of great importance.

##### 1. Electricity quality 
During my initial years in the field of IoT, I was working on a project where the customer's focus was to analyze the quality of electricity supplied to the rural residential areas and understand if there is a need for improvement. Since the faults and serious damages to humans as well as the appliances running can be caused by bad quality electricity in terms of low frequency, low voltages, fluctuating supply etc. can happen within a blink of an eye, it is important to keep a track of each and every data point that is sent to the engine. This shows that real-time observation ensures smooth operation of supply networks, detects anomalies and failures which ultimately helps improving the quality of electricity.

##### 2. ECG Monitoring
While I was studying Business Analytics, I was selected to work on a project for a clinic that was working on monitoring and analyzing real time ECG data of the patients to learn about the health and behviour to predict any kind of anomaly in their body and minimize the risk of any kind of problem that might occur and cause serious problems to the patients. Now imagine if the data from multiple streams is flowing in for the patient and we do not know ho to process and read it without missing even one single anomaly. Scary, right? Hence, visualizing and analyzing real time data is critically important in medical industry to get best insights about the patient's health.


#### Rendering high speed real time charts and ho difficult is it?
Though there are numerous open source streaming platforms as well as open source charting libraries available out there, plotting a realtime chart for streaming data is quite a task given the speed at which that data is collected from various sources. If you’re on a high tech machine, you might not feel any problem at all. But if you open up your task manager and take a look at the CPU usage, you'll know what's happening.

##### How do we stitch the incoming stream and the chart together to plot event data in realtime?
In this experiment we will plot streaming data from Kafka topics directly onto browser using Fusion Charts and ECharts.

### Let's understand the architecture!!

![image](https://github.com/poojaKarande13/streaming-data/blob/master/images/image.jpg)

1. The source of the data are sensors on the field, which send data to server via API calls. These can be any kind of sensors (temperature, pressure, speed, flow etc.) 
2. These APIs act as a Kafka producer and insert data into the Kafka topics. 
3. A Kafka consumer then reads data from the topic, filters it and sends it to a socket which act as a publisher of the data to the browser. 

**One of the easiest way to create sockets is with the help of the Socket.IO library. It is best for realtime bidirectional communication with the browser and server. You can read more about it here https://socket.io/docs/

4. At the subscriber end, we have NodeJS and React app which reads the data and plots it on the charts using any charting library. For the purpose of experiment I have used both Fusion Charts and ECharts.
5. Then a NodeJS app subscribes to the socket.


## Try it out yourself!!

I've crated a Github repo for you to use and try doing it on your own.

### Installation

#### Prerequisites

Please download/install the followin on your local machine:
1. Download Confluent : https://www.confluent.io/download/
2. Install Node.js and npm (use node version manager)
3. Clone my repo : https://github.com/poojaKarande13/streaming-data

#### Quickstart

1. Start Kafka

```$CONFLUENT_HOME/bin/confluent start```

2. Start the Kafka producer and the consumer (which is also the Socket publisher)
```
node producer.js

node consumer.js
```

3. Start the node app
```npm start```

Once the client is compiled, you will see the link in your terminal (e.g. http://localhost:3000) where the application is currently running. Use your browser to navigate to that link.

If everything works as epxpected, you should be able to see a real-time chart with high speed data flowing in! Don’t forget to have an eye on the CPU usage in the task manager while doing so.

### References

Kafka consumer config : enable.auto.commit
https://medium.com/@danieljameskay/understanding-the-enable-auto-commit-kafka-consumer-property-12fa0ade7b65

### I would like to thank you for reading this article. If you have feedback and suggestions or any type of constructive criticism, feel free to do so in comments. Cheers!
