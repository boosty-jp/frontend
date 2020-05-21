import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect } from 'react-konva';
import chroma from "chroma-js";
import { Button } from "antd";
import { randomChangeCover } from "modules/book/edit/generator"
import { CloudDownloadOutlined, RedoOutlined } from "@ant-design/icons"
import { downloadURI } from "utils/download-image"

const width = 300;
const height = 480;

const Title = ({ text, fontSize }) => {

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
            fill="#FFFFFF"
            lineHeight={1}
            fontStyle="bold"
        />
    )
}

const SubTitle = ({ text, fontSize }) => {
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
            fill="#FFFFFF"
            lineHeight={1}
        />
    )
}


const Author = ({ text, fontSize }) => {
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
            fill="#FFFFFF"
            lineHeight={1}
        />
    )
}

const Suqares = ({ color, mode }) => {
    return (
        [...Array(Math.ceil(10))].map((e, x) => {
            return (
                [...Array(Math.ceil(16))].map((e, y) => {
                    let fillColor = chroma(color).brighten(4 / 160 * x * y).hex();
                    if (mode === 'dark') {
                        fillColor = chroma(fillColor).darken(0.5).hex();
                    }
                    return (
                        <Rect x={x * 30} y={y * 30} width={30} height={30} fill={fillColor}></Rect>
                    )
                })
            );
        })
    )
}

class Pattern1CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill="#262626"></Rect>
                            <Suqares color={this.props.color} mode={this.props.mode} />
                            <Rect x={40} y={90} width={260} height={150} fill="#262626"></Rect>
                            <Title text={this.props.title} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} fontSize={this.props.authorFontSize} />
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
    mode: state.bookGenerator.mode,
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Pattern1Cover = connect(mapStateToProps, mapDispatchToProps)(Pattern1CoverComponent);
export default Pattern1Cover