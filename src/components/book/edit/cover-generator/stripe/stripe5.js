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

const Title = ({ text, color, fontSize }) => {

    return (
        <Text
            draggable={true}
            text={text}
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={144}
            padding={40}
            fill={color}
            lineHeight={1}
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

const Stripes = ({ color }) => {
    return (
        <>
            <Rect x={30} y={20} width={6} height={60} fill={color} rotation={45} cornerRadius={10}></Rect>
            <Rect x={100} y={4} width={4} height={90} fill={chroma(color).brighten(2).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={50} y={100} width={8} height={30} fill={chroma(color).brighten(1).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={240} y={30} width={4} height={140} fill={chroma(color).brighten(3).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={280} y={20} width={6} height={30} fill={chroma(color).brighten(1).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={200} y={340} width={8} height={100} fill={chroma(color).brighten(3).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={280} y={220} width={2} height={60} fill={color} rotation={45}></Rect>
            <Rect x={80} y={300} width={6} height={50} fill={color} rotation={45} cornerRadius={10}></Rect>
            <Rect x={50} y={380} width={4} height={120} fill={chroma(color).brighten(2).hex()} rotation={45} cornerRadius={10}></Rect>
            <Rect x={310} y={360} width={4} height={200} fill={chroma(color).brighten(1).hex()} rotation={45} cornerRadius={10}></Rect>
        </>
    )
}

const Border = ({ color, backgroundColor }) => {
    return (
        <>
            <Rect x={width / 2} y={40} width={200} height={200} fill={color} rotation={45}></Rect>
            <Rect x={width / 2} y={54} width={180} height={180} fill={backgroundColor} rotation={45}></Rect>
        </>
    )
}

class Stripe5CoverComponent extends React.Component {
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
                            <Stripes color={this.props.color} />
                            <Border color={this.props.color} backgroundColor={backgroundColor} />
                            <Title text={this.props.title} color={subTitleColor} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} color={subTitleColor} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} color={subTitleColor} fontSize={this.props.authorFontSize} />
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

const Stripe5Cover = connect(mapStateToProps, mapDispatchToProps)(Stripe5CoverComponent);
export default Stripe5Cover