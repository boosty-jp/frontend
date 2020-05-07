import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect, Shape } from 'react-konva';
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
            y={180}
            padding={10}
            fill={color}
            lineHeight={1.2}
            fontStyle="bold"
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
            y={420}
            padding={10}
            fill={color}
            lineHeight={1}
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
            y={230}
            padding={10}
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

const UpperLeftTriangle = ({ color }) => {
    return (
        [...Array(Math.ceil(30))].map((e, i) => {
            let height = 180;
            let width = 120;
            if (i % 2) {
                height = height - 6 * (i + 1) + 1;
                width = width - 4 * (i + 1) + 1;
                return (
                    <Triangle x1={0} y1={0} x2={0} y2={height} x3={width} y3={0} color="#FFFFFF" />
                )
            }
            height = height - 6 * i;
            width = width - 4 * i;
            return (
                <Triangle x1={0} y1={0} x2={0} y2={height} x3={width} y3={0} color={color} />
            )
        })
    )
}

const LowerRightTriangle2 = ({ color, backgroundColor }) => {
    return (
        [...Array(Math.ceil(20))].map((e, i) => {
            let height = 360;
            let width = 240;
            if (i % 2) {
                height = height + 6 * (i + 1) - 2;
                width = width - 3 * (i + 1) + 3;
                return (
                    <Triangle x1={0} y1={480} x2={0} y2={height} x3={width} y3={480} color={color} />
                )
            }
            height = height + 6 * i;
            width = width - 3 * i;
            return (
                <Triangle x1={0} y1={480} x2={0} y2={height} x3={width} y3={480} color={backgroundColor} />
            )
        })
    )
}

class Stripe3CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        const backgroundColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';
        const subTitleColor = this.props.mode === 'dark' ? '#FFFFFF' : '#262626';
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor}></Rect>
                            <Author text={this.props.author} color={subTitleColor} fontSize={this.props.authorFontSize} />
                            <UpperLeftTriangle color={this.props.color} />
                            <Title text={this.props.title} color={this.props.color} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} color={subTitleColor} fontSize={this.props.subTitleFontSize} />
                            <LowerRightTriangle2 color={this.props.color} backgroundColor={backgroundColor} />
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
const Stripe3Cover = connect(mapStateToProps, mapDispatchToProps)(Stripe3CoverComponent);
export default Stripe3Cover