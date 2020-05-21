import React from "react"
import { connect } from 'react-redux'
import { Slider } from 'antd';

const levels = {
    0: '入門',
    1: '初級',
    2: '中級',
    3: '上級',
};

const levelStyle = {
    width: '100%',
    padding: '20px',
    fontSize: 'bold',
    fontColor: 'black',
}

const TargetLevelComponent = (props) => {
    return (
        <div style={levelStyle}>
            <Slider
                marks={levels}
                step={1}
                max={3}
                min={0}
                tooltipVisible={false}
                range
                value={[props.start, props.end]}
                disabled
            />
        </div >
    )
}

const mapStateToProps = state => ({
    start: state.bookView.levelStart,
    end: state.bookView.levelEnd,
})

const TargetLevel = connect(mapStateToProps)(TargetLevelComponent);
export default TargetLevel