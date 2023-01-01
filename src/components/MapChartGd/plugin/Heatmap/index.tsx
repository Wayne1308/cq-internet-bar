import React, { useEffect, useState } from "react";
import "./index.scss";
import { Amap, useAmapComponent } from "@amap/amap-react";

interface Props {
    show?: boolean;
    data: any;
    max: any;
}

function MyHeatmap(props: Props) {
    const heatmap = useAmapComponent(
        (AMap, map) => {
            // 初始化热力图
            const heatmap = new AMap.HeatMap(map, {
                opacity: [0, 100],
                radius: 100, //给定半径
            });
            return heatmap;
        },
        ["AMap.HeatMap"] // 自动加载AMap.HeatMap插件
    );
    const { data, max } = props;

    useEffect(() => {
        if (!heatmap) return;
        heatmap.setDataSet({
            data,
            max
        });
    }, [heatmap, data, max]);

    return null; // 只需要图层，不需要输出 dom
}

export default MyHeatmap;
