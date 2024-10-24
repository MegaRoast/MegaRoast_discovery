import React from 'react'
import ReactECharts from 'echarts-for-react'
import chartSettings from './settings'
import { Box } from '@mui/material'
import styles from './bar.module.css'


const PieChart = ({ items, itemKey, itemType, title }) => {

    function addData (item, itemKey) {
        (item[itemKey] in data.tempData) ? data.tempData[item[itemKey]]+=1 : data.tempData[item[itemKey]]=1
    }
    let data={
        legendData: [],
        seriesData: [],
        tempData: {},
        totalData: 0
    }
    const scalingFactor=100
    items.map((item) => (addData(item, itemKey)))
    data.legendData=Object.keys(data.tempData).sort()
    data.legendData.map((dataElement) => (data.totalData+=data.tempData[dataElement]))
    data.legendData.map((dataElement) => (data.seriesData.push ({value: Math.round(scalingFactor*(data.tempData[dataElement]/data.totalData)), name: dataElement})))

    const options = {
        backgroundColor: chartSettings.backgroundColor,
        title: {
            text: title,
            textStyle: chartSettings.title.textStyle,
            show: false,
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show: false,
            min: 0,
            max: 100,
            inRange: {
                colorLightness: [0.35, 0.65]
            }
        },
        toolbox: {
            show: true,
            width: 100,
            feature: {
                saveAsImage: {
                    show: true,
                    title: 'Save as Image'
                },
            },
            left: 'auto',
        },
        series: [
            {
                name: itemType,
                type: 'pie',
                radius: '80%',
                data: data.seriesData.sort(function (a, b) { return a.value - b.value; }),
                label: {
                    color: chartSettings.labelColor
                },
                labelLine: {
                    lineStyle: {
                        color: chartSettings.labelColor
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: chartSettings.itemColor,
                    borderWidth: 0.2,
                    borderColor: chartSettings.itemBorderColor
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    return (
        <Box className={styles.chartContainer}>
            <Box className={styles.chartBoxTop}>
                <ReactECharts option={options} />
            </Box>
            <Box className={styles.chartBoxBottom}>
                <span>{title}</span>
            </Box>
        </Box>
    );
}


export default PieChart;
