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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={140}
            padding={10}
            fill="#000000"
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={370}
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={400}
            padding={18}
            fill="#000000"
            lineHeight={1}
        />
    )
}

class Simple1CoverComponent extends React.Component {
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
                            <Rect x={20} y={30} width={width - 40} height={height - 60}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 300, y: 480 }}
                                fillLinearGradientColorStops={[0, this.props.color, 1, chroma(this.props.color).brighten(3).hex()]}
                            ></Rect>
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

const Simple1Cover = connect(mapStateToProps, mapDispatchToProps)(Simple1CoverComponent);
export default Simple1Cover