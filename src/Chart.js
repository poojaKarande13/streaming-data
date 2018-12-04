import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import { subscribeToKafkaSocket } from './loadData';

class Chart extends Component {
  constructor(props) {
    super(props);
    subscribeToKafkaSocket((err, event) => {
      console.log(event);
      var data = this.state.data;
      if (data.length > 50) {
        data.shift();
      }
      data.push({
        "label": (new Date(event.timestamp)).toLocaleString('en-US'),
        "value": event.data
      })
      this.setState({data})
    }, 'tcde9abaa2');
  }

  state = {
    data: []
  };

  render () {
    console.log('event');
    var chartConfigs = {
      type: 'line',
      width: 600,
      height: 400,
      dataFormat: 'json',
      dataSource: {
      "chart": {
        "caption": "Output active power from solar plant",
        "xAxisName": "Time",
        "yAxisName": "Output Active Power (kW)",
        "theme": "fusion"
      },
      "data": this.state.data
    },
  };
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
