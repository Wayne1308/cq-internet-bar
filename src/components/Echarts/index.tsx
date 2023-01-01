import React from "react";
import './index.scss';
import * as echarts from 'echarts';
// @ts-ignore
import PropTypes from 'prop-types';

interface propsType {
    options?: Object;
    mapJson?: PropTypes.geoJson;
    onClicks?: any;
}

class Echarts extends React.Component<propsType> {
    echartsRef: any;
    myChart: any;
    constructor(props: propsType) {
        super(props);
        this.echartsRef = React.createRef();
    }
    // 元素渲染完成之后
    componentDidMount() {
        const me = this;
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(this.echartsRef.current);
        this.props.mapJson && echarts.registerMap('chongqing', this.props.mapJson);
        this.myChart.showLoading();
        // 绘制图表
        this.myChart.setOption(this.props.options);
        this.myChart.hideLoading();
        this.myChart.on('click', function (params: any) {
            me.props.onClicks(params);
        });
    }
    render() {
        if(this.myChart) {
            // this.myChart.dispose();
            this.myChart.setOption(this.props.options);
        }
        return <div className='echarts' ref={this.echartsRef}></div>
    }
}

// @ts-ignore
Echarts.defaultProps = {
    name: 'echarts',
    options: {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }
        ]
    }
};

// @ts-ignore
Echarts.propTypes = {
    name: PropTypes.string,
    options: PropTypes.object,
    MapJson: PropTypes.any,
}

export default Echarts;