import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { config as AmapReactConfig } from '@amap/amap-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// AmapReactConfig.version = '2.0'; // 默认2.0，这里可以不修改
AmapReactConfig.key = 'a7e02678c02373c5e3bcd24674ad104f';
AmapReactConfig.plugins = [
    // 'AMap.ToolBar',
    // 'AMap.MoveAnimation',
    // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
