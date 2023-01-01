import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import MapChart from './components/MapChart'
import MapChartGd from './components/MapChartGd'
import TimePieChart from './components/TimePieChart'
import LineChart from './components/LineChart';

function App() {
    const [pieData, changePieData] = useState({
        name: '',
        value: ''
    })

    function getPieParams(e: any) {
        changePieData({
            name: e.data.name,
            value: e.data.value
        })
        
    }
    return (
        <div className="App">
            <div className={'ch-internet-bar-container'}>
                <div className={'left-box'}>
                    <MapChartGd></MapChartGd>
                </div>
                <div className={'right-box'}>
                    <div
                        className={'item-box'}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <TimePieChart
                            clickPie={getPieParams}
                            title={'上网人数占比-大学'}
                        ></TimePieChart>
                        <TimePieChart clickPie={getPieParams} title={'上网人数占比-中学'}></TimePieChart>
                    </div>
                    <div className={'item-box'}>
                        <LineChart pieData={pieData}></LineChart>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
