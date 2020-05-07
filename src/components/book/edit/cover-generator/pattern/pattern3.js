import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect, Shape } from 'react-konva';
import chroma from "chroma-js";
import { Button } from "antd";
import { randomChangeCover } from "modules/book/edit/generator"
import { CloudDownloadOutlined, RedoOutlined } from "@ant-design/icons"
import { downloadURI } from "utils/download-image"

const width = 300;
const height = 480;

const Title = ({ text, color, fontSize }) => {

    return (
        <Text
            draggable={true}
            text={text}
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={120}
            padding={10}
            fill={color}
            lineHeight={1}
            fontStyle="bold"
        />
    )
}

const SubTitle = ({ text, color, fontSize }) => {
    text = text ? "\"" + text + "\"" : "";
    return (
        <Text
            draggable={true}
            text={text}
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={165}
            padding={18}
            fill={color}
            lineHeight={1}
        />
    )
}


const Author = ({ text, color, fontSize }) => {
    return (
        <Text
            draggable={true}
            text={text}
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={190}
            padding={18}
            fill={color}
            lineHeight={1}
        />
    )
}

const Triangle = ({ x1, y1, x2, y2, x3, y3, color }) => {
    return (
        <Shape
            sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineTo(x3, y3);
                context.closePath();
                context.fillStrokeShape(shape);
            }}
            fill={color}
        />
    )
}

class Pattern3CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        let url = "";
        if (this.stageRef) {
            url = this.stageRef.getStage().toDataURL();
        }
        const backgroundColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';
        const subTitleColor = this.props.mode === 'dark' ? '#FFFFFF' : '#262626';
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor}></Rect>
                            <Triangle color={this.props.color} x1={160.704122} y1={336} x2={254} y2={480} x3={131} y3={480} />
                            <Triangle color={chroma(this.props.color).brighten(2).hex()} x1={37} y1={480} x2={161} y2={336} x3={131.502549} y3={480} />
                            <Triangle color={this.props.color} x1={273.520984} y1={381} x2={337.418096} y2={479.944403} x3={253.177024} y3={479.944403} />
                            <Triangle color={chroma(this.props.color).brighten(2).hex()} x1={188} y1={479.944403} x2={273.520984} y2={381} x3={253.177024} y3={479.944403} />
                            <Triangle color={this.props.color} x1={56.3439598} y1={398} x2={120.241072} y2={496.944403} x3={36} y3={496.944403} />
                            <Triangle color={chroma(this.props.color).brighten(2).hex()} x1={-29} y1={496.944403} x2={56.5209837} y2={398} x3={36.1770239} y3={496.944403} />
                            <Title text={this.props.title} color={subTitleColor} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} color={subTitleColor} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} color={subTitleColor} fontSize={this.props.authorFontSize} />
                        </Layer>
                    </Stage>
                </div >
                <div style={{ marginTop: '20px', width: '300px' }}>
                    <Button shape="round" block icon={< RedoOutlined />} onClick={() => this.props.randomChangeCover()}>ランダムに選ぶ</Button>
                </div>
                <div style={{ marginTop: '20px', width: '300px' }}>
                    <Button onClick={this.handleClick} shape="round" block type="primary" icon={<CloudDownloadOutlined />}>ダウンロードする</Button>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    title: state.bookGenerator.title,
    subTitle: state.bookGenerator.subTitle,
    author: state.bookGenerator.author,
    titleFontSize: state.bookGenerator.titleFontSize,
    subTitleFontSize: state.bookGenerator.subTitleFontSize,
    authorFontSize: state.bookGenerator.authorFontSize,
    color: state.bookGenerator.color,
    mode: state.bookGenerator.mode,
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Pattern3Cover = connect(mapStateToProps, mapDispatchToProps)(Pattern3CoverComponent);
export default Pattern3Cover