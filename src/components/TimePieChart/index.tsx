import Echarts2 from "../Echarts2";
import * as echarts from "echarts";
import React from "react";
import './index.scss';
import {getRandom} from "../../utils";
import moment from "moment";

interface Props {
    title?: string;
    clickPie?: any;
}
class TimePieChart extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
        this.state = {
            options: {}
        }
    }
    componentDidMount() {
        this.setState({
            options: this.getOptions()
        })
    };

    getOptions(): object {
        const cellSize = [50, 50];
        const pieRadius = 20;

        function getVirtualData() {
            const date = +echarts.time.parse('2017-02-01');
            const end = +echarts.time.parse('2017-03-01');
            const dayTime = 3600 * 24 * 1000;
            const data: [string, number][] = [];
            for (let time = date; time < end; time += dayTime) {
                data.push([
                    echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                    Math.floor(Math.random() * 10000)
                ]);
            }
            return data;
        }

        const scatterData = getVirtualData();
        const pieSeries = scatterData.map(function (item, index) {
            const week = moment(item[0]).format('dddd');
            let max = 110;
            let min = 50;
            if(week === 'Saturday' || week === 'Sunday') {
                max = 200;
                min = 100;
            }
            return {
                type: 'pie',
                id: 'pie-' + index,
                center: item[0],
                radius: pieRadius,
                coordinateSystem: 'calendar',
                label: {
                    formatter: '{c}',
                    position: 'inside',
                    itemStyle: {
                        fontSize: 5
                    }
                },
                data: [
                    { name: '十月',  value: getRandom(min, max)},
                    { name: '十一月', value: getRandom(min, max) },
                    { name: '十二月', value: getRandom(min, max) }
                ]
            } as echarts.PieSeriesOption;
        });

        const option = {
            title: {
              show: true,
              text: this.props.title || ''
            },
            tooltip: {},
            legend: {
                data: ['十月', '十一月', '十二月'],
                bottom: 0
            },
            grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                yearLabel: {
                    show: false,
                    fontSize: 10
                },
                dayLabel: {
                    margin: 20,
                    firstDay: 1,
                    nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                },
                monthLabel: {
                    show: false
                },
                range: ['2017-02']
            },
            series: [
                {
                    id: 'label',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    symbolSize: 0,
                    selectedMode: true,
                    label: {
                        show: true,
                        formatter: function (params: any) {
                            return echarts.time.format(params.value[0], '{dd}', false);
                        },
                        offset: [-cellSize[0] / 2 + 6, -cellSize[1] / 2 + 6],
                        fontSize: 10
                    },
                    data: scatterData
                },
                ...pieSeries
            ]
        };

        return option
    }


    render() {
        return <Echarts2 onClicks={this.props.clickPie}  options={ this.getOptions() } ></Echarts2>
    }
}

export default TimePieChart;