import React from 'react';
import ReactECharts from 'echarts-for-react';

const TreemapChart = ({ data }) => {
  const getOption = () => ({
    series: [
      {
        type: 'treemap',
        data: data,
        label: {
          show: true,
          formatter: '{b}'
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#777',
              borderWidth: 0,
              gapWidth: 1
            }
          },
          {
            colorSaturation: [0.3, 0.6],
            itemStyle: {
              borderColorSaturation: 0.7,
              gapWidth: 1,
              borderWidth: 1
            }
          },
          {
            colorSaturation: [0.3, 0.5],
            itemStyle: {
              borderColorSaturation: 0.6,
              gapWidth: 1
            }
          },
          {
            colorSaturation: [0.3, 0.5]
          }
        ]
      }
    ]
  });

  return <ReactECharts option={getOption()} style={{ height: '400px', width: '100%' }} />;
};

export default TreemapChart;