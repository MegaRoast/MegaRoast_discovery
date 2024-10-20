import React from 'react'
import ReactECharts from 'echarts-for-react'
import chartSettings from './settings'
import styles from './bar.module.css'; // Import the CSS module
import { Box } from '@mui/material';

const BarChart = ({items, itemKey, itemType, valueKey, title, yAxisName, xAxisName}) => {

    function addData (item, name, value) {
        data.labels.push(item[name])
        data.values.push(item[value])
    }
    let data={
        labels: [],
        values: []
    }
    items.map ((item) => (addData(item, itemKey, valueKey)))

    const options = {
        backgroundColor: chartSettings.backgroundColor,
        title: {
            text: title,
            textStyle: chartSettings.title.textStyle,
            show: false,
        },
        tooltip : {
          trigger: 'axis',
          axisPointer : {
            type : 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          borderColor: chartSettings.labelColor
        },
        xAxis: {
          type : 'category',
          splitLine: {show:false},
          data :  data.labels,
          show: false,
          name: xAxisName,
        },
        yAxis: {
          type : 'value',
          name: yAxisName,
          nameRotate: 90,
          nameLocation: 'center',
          nameGap: 17,
          show: true,
        },
        toolbox: {
            show: true,
            width: 50,
            feature: {
                saveAsImage: {show: true},
            },
            right: '2%'
        },
        series: [
          {
            name: itemType,
            type: 'bar',
            data: data.values,
            markLine: {
                lineStyle: {
                    color: chartSettings.itemAccentColor
                },
                precision: 0,
                label: {
                    position: 'start',
                    textBorderColor: 'inherit',
                    color: chartSettings.itemAccentColor
                },
            },
            itemStyle: {
                borderWidth: 1,
                borderRadius: 1,
                color: chartSettings.itemColor,
            }
          }
        ]
      }

    return (
    
        <Box className={styles.chartContainer}>
            <Box className={styles.chartBoxTop}>
                <ReactECharts option={options} />
            </Box>
            <Box className={styles.chartBoxBottom}>
                <span>{title}</span>
            </Box>
        </Box>
    )
}

export default BarChart
