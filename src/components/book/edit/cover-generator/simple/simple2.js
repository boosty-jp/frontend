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

const Title = ({ text, mode, fontSize }) => {
    const textColor = mode === 'dark' ? '#262626' : '#FFFFFF';
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width - 40}
            x={0}
            y={140}
            padding={10}
            fill={textColor}
            lineHeight={1.2}
            fontStyle="bold"
        />
    )
}

const SubTitle = ({ text, mode, fontSize }) => {
    text = text ? "\"" + text + "\"" : "";
    const textColor = mode === 'dark' ? '#FFFFFF' : '#262626';
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={370}
            padding={18}
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

class Simple2CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }

    render() {
        const backgroundColor = this.props.mode === 'dark' ? '#262626' : '#ffffff'
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill={backgroundColor}></Rect>
                            <Rect x={0} y={70} width={width - 40} height={160}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 280, y: 200 }}
                                fillLinearGradientColorStops={[0, this.props.color, 1, chroma(this.props.color).brighten(3).hex()]}
                            ></Rect>
                            <Title text={this.props.title} mode={this.props.mode} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} mode={this.props.mode} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} mode={this.props.mode} fontSize={this.props.authorFontSize} />
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

const Simple2Cover = connect(mapStateToProps, mapDispatchToProps)(Simple2CoverComponent);
export default Simple2Cover