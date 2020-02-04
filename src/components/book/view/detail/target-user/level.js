import React from "react"
import { Slider } from 'antd';

const levels = {
    0: {
        style: {
            color: '#1890ff',
        },
        label: <strong>入門</strong>,
    },
    33.3: {
        style: {
            color: '#1890ff',
        },
        label: <strong>初級</strong>,
    },
    66.6: '中級',
    100: '上級',
};

const levelStyle = {
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const TargetLevel = () => {
    return (
        <div style={levelStyle}>
            <Slider marks={levels} defaultValue={[0, 33.3]} step={null} tooltipVisible={false} range disabled />
        </div >
    )
}

export default TargetLevel