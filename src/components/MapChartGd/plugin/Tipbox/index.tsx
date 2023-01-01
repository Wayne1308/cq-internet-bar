import React from "react";
import Img from "../../assets/tip.png";
import './index.scss';
import {useState} from "react";

interface Props {
    ifHeatmap?: any;
    ifTime?: any;
    changeTime?: any;
}

function Tipbox(props: Props) {
    const [selectTime, changeTimes] = useState(false);

    function clickTime(e: any) {
        props.ifTime(e);
        changeTimes(e.currentTarget.checked)
    }

    return (
        <div className={'show-tips-container'}>
            <div className={"line"} style={{marginBottom: '5px'}}>大学：<img src={"http://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png"}/></div>
            <div className={"line"} style={{marginBottom: '5px'}}>中学：<img src={Img} width={"23px"} height={"40px"}/></div>
            <div style={{marginBottom: '5px'}}>
                <input
                    type="checkbox"
                    id={'hostMap'}
                    value={'hostMap'}
                    onClick={props.ifHeatmap}
                />
                <label htmlFor="hostMap">热力图</label>
            </div>
            <div>
                <input type="checkbox" onClick={clickTime} id={'time'} value={'time'} />
                <label htmlFor="time">时间</label>
                <div className={"time-input"} style={{marginTop: '5px'}}>
                    <input type="radio" id={'times1'} name={"times"} onChange={props.changeTime} data-index={1} defaultChecked={true} disabled={!selectTime} value={'01'} />
                    <label htmlFor="times1">08:00 ~ 11:00</label>
                </div>
                <div className={"time-input"}>
                    <input type="radio" id={'times2'} name={"times"} onChange={props.changeTime} data-index={2} disabled={!selectTime} value={'02'} />
                    <label htmlFor="times2">11:00 ~ 14:00</label>
                </div>

                <div className={"time-input"}>
                    <input type="radio" id={'times3'} name={"times"} onChange={props.changeTime} data-index={3} disabled={!selectTime} value={'03'} />
                    <label htmlFor="times3">14:00 ~ 18:00</label>
                </div>
            </div>
        </div>
    )
}

export default Tipbox;