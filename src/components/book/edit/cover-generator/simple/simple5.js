import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect, Shape } from 'react-konva';
import { Button } from "antd";
import { randomChangeCover } from "modules/book/edit/generator"
import { CloudDownloadOutlined, RedoOutlined } from "@ant-design/icons"
import { downloadURI } from "utils/download-image"

const width = 300;
const height = 480;

const Title = ({ text, mode, fontSize }) => {
    const textColor = mode === 'dark' ? '#FFFFFF' : '#262626';
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width - 40}
            x={0}
            y={140}
            padding={14}
            fill={textColor}
            lineHeight={1.2}
            fontStyle="bold"
        />
    )
}

const SubTitle = ({ text, mode, fontSize }) => {
    const textColor = mode === 'dark' ? '#FFFFFF' : '#262626';
    text = text ? "\"" + text + "\"" : "";
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={190}
            padding={14}
            fill={textColor}
            lineHeight={1}
        />
    )
}


const Author = ({ text, mode, fontSize }) => {
    const textColor = mode === 'dark' ? '#FFFFFF' : '#262626';
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={400}
            padding={18}
            fill={textColor}
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

class Simple5CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        const backgroundColor = this.props.mode === 'dark' ? "#262626" : "#FFFFFF";
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor}></Rect>
                            <Triangle x1={0} y1={0} x2={180} y2={0} x3={0} y3={100} color={this.props.color} />
                            <Triangle x1={width} y1={height} x2={width} y2={height - 100} x3={width - 180} y3={height} color={this.props.color} />
                            <Title text={this.props.title} mode={this.props.mode} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} mode={this.props.mode} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} mode={this.props.mode} fontSize={this.props.authorFontSize} />
                        </Layer>
                    </Stage>
                </div>
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
    mode: state.bookGenerator.mode
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Simple5Cover = connect(mapStateToProps, mapDispatchToProps)(Simple5CoverComponent);
export default Simple5Cover