import React, {useEffect, useState} from 'react'
import './index.scss'
import { Amap, Marker } from '@amap/amap-react';
import universityJson from './assets/大学.json'
import schoolJson from './assets/中学.json'
import Icon from './assets/tip.svg';
import Tipbox from "./plugin/Tipbox";
import MyHeatmap from "./plugin/Heatmap";
import { getRandom } from "../../utils";

const loadingStyle = {
    position: 'relative',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
// @ts-ignore
const Loading = <div style={loadingStyle}>Loading Map...</div>

class MapChartGd extends React.Component<any, any> {
    gdMapRef: any;

    constructor(props: any) {
        super(props)
        this.state = {
            mapConfig: {
                mapPlugins: ['ToolBar'],
                center: [106.469759, 29.562354],
                zoom: 11,
                mapStyle: 'amap://styles/macaron'
            },
            markers: [],
            showHeatmap: false,
            showTime: false
        }
        this.gdMapRef = React.createRef();
        this.ifHeatmap = this.ifHeatmap.bind(this);
        this.ifTime = this.ifTime.bind(this);
        this.changeT = this.changeT.bind(this);
    }

    initMarkers() {
        const universityMarkers = universityJson.map(function (o: any) {
            return {
                address: o.address || '',
                name: o.name,
                shape_region: o.shape_region,
                type: 1,
                position: {
                    longitude: o.longitude,
                    latitude: o.latitude,
                },
            }
        });
        const schoolMarkers = schoolJson.map(function (o: any) {
            return {
                address: o.address || '',
                name: o.name,
                type: 2,
                shape_region: o.shape_region,
                position: {
                    longitude: o.longitude,
                    latitude: o.latitude,
                },
            }
        });

        this.setState({
            markers: [...universityMarkers, ...schoolMarkers]
        })
    }

    fetchMarkers() {
        return (this.state.markers || []).map((o: any) => {
            // type 1：大学 2：中学
            let icon = '';
            if(o.type === 2) {
                icon = Icon;
            }
            return <Marker key={o.name} position={[o.position.longitude, o.position.latitude]} icon={icon}></Marker>
        })
    }

    fetchHeatmap() {
        return (this.state.markers || []).map((o: any) => {
            let count = getRandom(10, 60);
            if(o.type === 1) {
                count = getRandom(40, 100);
            }
            if(this.props.showTime) {
                count = getRandom(10, 30);
            }
            return {
                "lng": o.position.longitude,
                "lat": o.position.latitude,
                "count": count
            }
        })
    }

    componentDidMount() {
        this.initMarkers();
    }

    ifHeatmap(e: any) {
        this.setState({
            showHeatmap: e.currentTarget.checked
        });
    }

    ifTime(e: any) {
        this.setState({
            showTime: e.currentTarget.checked
        });
    }

    changeT(e: any) {
        this.setState({
            showTime: e.currentTarget.dataset.index
        })
    }

    ShowHeatmap (props: any) {
        if(props.show) {
            return
        }
    }

    render() {
        let showHeatMap = <div></div>;
        if(this.state.showHeatmap) {
            showHeatMap = <MyHeatmap show={this.state.showHeatmap} data={this.fetchHeatmap()} max={100} />
        }
        return (
            <div className={'map-chart-container'} ref={this.gdMapRef}>
                <span style={{fontSize: "19px", fontWeight: 900, marginBottom: "10px"}}>网吧地理分布图</span>
                <Amap mapStyle={this.state.mapConfig.mapStyle} center={this.state.mapConfig.center} zoom={this.state.mapConfig.zoom}>
                    {this.fetchMarkers()}
                    <Tipbox ifTime={this.ifTime} ifHeatmap={this.ifHeatmap} changeTime={this.changeT}></Tipbox>
                    {showHeatMap}
                </Amap>
            </div>
        )
    }
}

export default MapChartGd
