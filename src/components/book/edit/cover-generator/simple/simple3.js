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
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={40}
            padding={20}
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
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={90}
            padding={20}
            fill='#FFFFFF'
            lineHeight={1}
        />
    )
}


const Author = ({ text, fontSize }) => {
    return (
        <Text
            draggable={true}
            text={text}
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={120}
            padding={20}
            fill='#FFFFFF'
            lineHeight={1}
        />
    )
}

class Simple3CoverComponent extends React.Component {
    handleClick = () => {
        downloadURI(this.stageRef.getStage().toDataURL(), "book-cover.png");
    }
    render() {
        const lightColor = this.props.mode === 'dark' ? this.props.color : chroma(this.props.color).brighten(3).hex();
        const darkColor = this.props.mode === 'dark' ? chroma(this.props.color).darken(2).hex() : this.props.color;
        return (
            <>
                <div style={{ boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)' }}>
                    <Stage width={width} height={height} ref={node => { this.stageRef = node }}>
                        <Layer>
                            <Rect x={0} y={0} width={width} height={height} fill="#FFFFFF"></Rect>
                            <Rect x={0} y={0} width={width} height={height}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 300, y: 480 }}
                                fillLinearGradientColorStops={[0, darkColor, 1, lightColor]}
                            ></Rect>
                            <Title text={this.props.title} mode={this.props.mode} fontSize={this.props.titleFontSize} />
                            <Author text={this.props.author} mode={this.props.mode} fontSize={this.props.authorFontSize} />
                            <SubTitle text={this.props.subTitle} mode={this.props.mode} fontSize={this.props.subTitleFontSize} />
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

const Simple3Cover = connect(mapStateToProps, mapDispatchToProps)(Simple3CoverComponent);
export default Simple3Cover