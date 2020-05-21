import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect } from 'react-konva';
import { Button } from "antd";
import { randomChangeCover } from "modules/book/edit/generator"
import { CloudDownloadOutlined, RedoOutlined } from "@ant-design/icons"
import { downloadURI } from "utils/download-image"

const width = 300;
const height = 480;
const lineWidth = 1;
const lineSpacing = 6;
const lineRotation = 20;
const lineNumber = height / (lineWidth + lineSpacing);

const Title = ({ text, color, fontSize }) => {
    const yPos = height / 6;

    return (
        <Text
            draggable={true}
            text={text}
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={yPos}
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={448}
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={430}
            padding={10}
            fill={color}
            lineHeight={1}
        />
    )
}

class Stripe1CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        const backgroundColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';
        const subTitleBackgroundColor = this.props.mode === 'dark' ? '#FFFFFF' : '#262626';
        const titleColor = this.props.mode === 'dark' ? '#FFFFFF' : '#262626';
        const subTitleColor = this.props.mode === 'dark' ? '#262626' : '#FFFFFF';

        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={this.props.color}></Rect>
                            {[...Array(Math.ceil(lineNumber))].map((e, i) => {
                                const yPos = (lineWidth + lineSpacing) * i
                                return (
                                    <Rect x={0} y={yPos} key={i} fill={backgroundColor} width={width + 100} height={lineWidth} rotation={lineRotation}></Rect>
                                )
                            })}
                            <Rect x={0} y={0} width={300} height={140} fill={backgroundColor}></Rect>
                            <Title text={this.props.title} color={titleColor} fontSize={this.props.titleFontSize} />
                            <Rect x={0} y={430} width={300} height={50} fill={subTitleBackgroundColor}></Rect>
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
    mode: state.bookGenerator.mode
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Stripe1Cover = connect(mapStateToProps, mapDispatchToProps)(Stripe1CoverComponent);
export default Stripe1Cover