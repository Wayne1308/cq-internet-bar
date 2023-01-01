import Echarts from "../Echarts";
import React from "react";
import './index.scss';
import { getRandom } from "../../utils";
interface Props {
    pieData?: any;
}
class TimePieChart extends React.Component<Props, any> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    };

    getOptions(): object {
        const arr = [1,2,3,4,5,6,7]
        const daxueData = arr.map((o: any) => {
            return getRandom(0, 10);
        })

        const zhongxueData = arr.map((o: any) => {
            if(o >= 5) {
                return getRandom(20, 40);
            }else {
                return getRandom(0, 20);
            }

        })

        console.log(daxueData, zhongxueData);
        

        return {
            title: {
                show: true,
                text: '跟踪身份证时间段上网人数'
            },
            grid: {
              top: 60,
              bottom: 25,
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            legend: {
                show: true,
                top: 0
            },
            xAxis: {
                type: 'category',
                data: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
                name: '时间段'
            },
            yAxis: {
                type: 'value',
                name: '人数',
                minInterval: 10,
                min: 0,
                max: 50
            },
            series: [
                {
                    name: '大学',
                    data: daxueData,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: '#4d91ef'
                    }
                },
                {
                    name: '中学',
                    data: zhongxueData,
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: '#c63420'
                    }
                }
            ]
        };
    }


    render() {
        const options = this.getOptions();
        return <Echarts options={ options } ></Echarts>
    }
}

export default TimePieChart;