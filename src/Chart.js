import React, { Component } from 'react';
import ReactFC from 'react-fusioncharts';
import { subscribeToKafkaSocket } from './loadData';
import ReactEcharts from 'echarts-for-react';
import Grid from '@material-ui/core/Grid';

class Chart extends Component {
  constructor(props) {
    super(props);
    subscribeToKafkaSocket((err, event) => {
      var data = this.state.data;
      var data1 = this.state.data1;
      if (data.length > 50) {
        data.shift();
        data1.shift();
      }
      data1.push({
        name: (new Date(event.timestamp)).toLocaleString('en-US'),
        value: [
            (new Date(event.timestamp)),
            Number.parseFloat(event.data).toPrecision(2)
        ]
      })
      data.push({
        "label": (new Date(event.timestamp)).toLocaleString('en-US').split(' ')[1] + " PM",
        "value": event.data
      })
      this.setState({data: data, data1: data1})
    });
  }

  state = {
    data: [],
    data1: []
  };


  render () {
    var chartOptions = {
        title: {
          text: 'E charts'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        legend: {
          data:['Energy']
        },
        xAxis : {
          type : 'time',
          name: 'Time',
          splitLine: {
              show: false
          }
        },
        yAxis : {
          type : 'value',
          name: 'Output Active Power (kW)',
          splitLine: {
              show: false
          }
        },
        series : [
          {
            name:'a',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: this.state.data1
          }
        ]
    }

    var chartConfigs = {
      type: 'line',
      width: 700,
      dataFormat: 'json',
      dataSource: {
      "chart": {
        "caption": "Fusion Charts",
        "xAxisName": "Time",
        "yAxisName": "Output Active Power (kW)",
        "theme": "fusion",
        "labelDisplay": "Auto",
        "useEllipsesWhenOverflow":"0"
      },
      "data": this.state.data
    },
  };

    return (<div style={{ padding: 20 }}>
      <div style={{padding: '20px', 'textAlign': 'center'}} >
        {"Output active power from solar plant"}
      </div>
      <Grid container spacing={40}>

      <ReactFC  width='700' {...chartConfigs} />
      <ReactEcharts
        option={chartOptions}
        style={{width: '700px'}}
        className='react_for_echarts' />
      </Grid>
    </div>);
  }
}

export default Chart;
