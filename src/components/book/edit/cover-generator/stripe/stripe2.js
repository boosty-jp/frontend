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
            align="left"
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
            y={10}
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
            y={420}
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
        [...Array(Math.ceil(20))].map((e, i) => {
            let height = 60;
            let width = 240;
            if (i % 2) {
                height = height - 3 * (i + 1) + 1;
                width = width - 12 * (i + 1) + 1;
                return (
                    <Triangle x1={0} y1={0} x2={0} y2={height} x3={width} y3={0} color="#FFFFFF" />
                )
            }
            height = height - 3 * i;
            width = width - 12 * i;
            return (
                <Triangle x1={0} y1={0} x2={0} y2={height} x3={width} y3={0} color={color} />
            )
        })
    )
}

const UpperRightTriangle = ({ color }) => {
    return (
        <Triangle x1={width} y1={0} x2={60} y2={0} x3={width} y3={60} color={color} />
    )
}

const LowerRightTriangle = ({ color }) => {
    return (
        <Triangle x1={300} y1={330} x2={0} y2={480} x3={300} y3={480} color={color} />
    )
}

const LowerLeftTriangle1 = ({ color }) => {
    return (
        <Triangle x1={0} y1={390} x2={240} y2={480} x3={0} y3={480} color={color} />
    )
}

const LowerLeftTriangle2 = ({ color, backgroundColor }) => {
    return (
        [...Array(Math.ceil(20))].map((e, i) => {
            let height = 420;
            let width = 160;
            if (i % 2) {
                height = height + 3 * (i + 1) - 2;
                width = width - 8 * (i + 1) + 3;
                return (
                    <Triangle x1={0} y1={480} x2={0} y2={height} x3={width} y3={480} color={color} />
                )
            }
            height = height + 3 * i;
            width = width - 8 * i;
            return (
                <Triangle x1={0} y1={480} x2={0} y2={height} x3={width} y3={480} color={backgroundColor} />
            )
        })
    )
}

class Stripe2CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        const backgroundColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';
        const subTitleBackgroundColor = this.props.mode === 'dark' ? '#FFFFFF' : '#262626';
        const subTitleColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';

        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor}></Rect>
                            <UpperRightTriangle color={subTitleBackgroundColor} />
                            <Author text={this.props.author} color={subTitleColor} fontSize={this.props.authorFontSize} />
                            <UpperLeftTriangle color={this.props.color} />
                            <Title text={this.props.title} color={this.props.color} fontSize={this.props.titleFontSize} />
                            <LowerLeftTriangle1 color={subTitleBackgroundColor} />
                            <LowerRightTriangle color={this.props.color} />
                            <SubTitle text={this.props.subTitle} fontSize={this.props.subTitleFontSize} />
                            <LowerLeftTriangle2 color={this.props.color} backgroundColor={backgroundColor} />
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
    mode: state.bookGenerator.mode
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Stripe2Cover = connect(mapStateToProps, mapDispatchToProps)(Stripe2CoverComponent);
export default Stripe2Cover