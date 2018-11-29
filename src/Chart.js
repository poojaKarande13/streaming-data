import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import { subscribeToKafkaSocket } from './loadData';

class Chart extends Component {
  constructor(props) {
    super(props);
    subscribeToKafkaSocket((err, value) => {
      var data = this.state.data;
      if (data.length > 20) {
        data.shift();
      }
      data.push({
        "label": new Date(),
        "value": value
      })
      this.setState({data})
    });
  }


  state = {
    data: []
  };

  render () {
    var chartConfigs = {
      type: 'line',
      width: 600,
      height: 400,
      dataFormat: 'json',
      dataSource: {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion"
      },
      "data": this.state.data
    },
  };
    return <ReactFC {...chartConfigs} />;
  }
}

export default Chart;
