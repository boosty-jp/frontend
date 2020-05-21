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
            y={90}
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={135}
            padding={10}
            fill={color}
            lineHeight={1}
        />
    )
}

const ColoredLines = ({ color }) => {
    return (
        <>
            <Rect x={10} y={0} width={8} height={30} fill={color} cornerRadius={10}></Rect>
            <Rect x={18} y={330} width={4} height={120} fill={chroma(color).brighten(0.5).hex()} cornerRadius={10}></Rect>
            <Rect x={30} y={60} width={6} height={50} fill={chroma(color).brighten(1).hex()} cornerRadius={10}></Rect>
            <Rect x={35} y={160} width={6} height={80} fill={chroma(color).brighten(1.8).hex()} cornerRadius={10}></Rect>
            <Rect x={50} y={30} width={6} height={20} fill={chroma(color).brighten(2.2).hex()} cornerRadius={10}></Rect>
            <Rect x={55} y={360} width={4} height={40} fill={chroma(color).brighten(2.8).hex()} cornerRadius={10}></Rect>
            <Rect x={65} y={430} width={6} height={30} fill={chroma(color).brighten(0.3).hex()} cornerRadius={10}></Rect>
            <Rect x={80} y={220} width={6} height={100} fill={chroma(color).brighten(0.8).hex()} cornerRadius={10}></Rect>
            <Rect x={90} y={40} width={6} height={40} fill={chroma(color).brighten(1.7).hex()} cornerRadius={10}></Rect>
            <Rect x={100} y={320} width={4} height={40} fill={chroma(color).brighten(2.8).hex()} cornerRadius={10}></Rect>
            <Rect x={120} y={430} width={6} height={80} fill={chroma(color).brighten(2).hex()} cornerRadius={10}></Rect>
            <Rect x={150} y={0} width={6} height={50} fill={chroma(color).brighten(0.1).hex()} cornerRadius={10}></Rect>
            <Rect x={150} y={270} width={6} height={30} fill={chroma(color).brighten(1.4).hex()} cornerRadius={10}></Rect>
            <Rect x={160} y={330} width={4} height={70} fill={chroma(color).brighten(1).hex()} cornerRadius={10}></Rect>
            <Rect x={170} y={190} width={4} height={90} fill={chroma(color).brighten(1.9).hex()} cornerRadius={10}></Rect>
            <Rect x={170} y={420} width={4} height={40} fill={chroma(color).brighten(2.9).hex()} cornerRadius={10}></Rect>
            <Rect x={195} y={260} width={6} height={60} fill={chroma(color).brighten(2.5).hex()} cornerRadius={10}></Rect>
            <Rect x={200} y={50} width={4} height={30} fill={chroma(color).brighten(0).hex()} cornerRadius={10}></Rect>
            <Rect x={220} y={220} width={6} height={80} fill={chroma(color).brighten(1.5).hex()} cornerRadius={10}></Rect>
            <Rect x={230} y={400} width={6} height={50} fill={chroma(color).brighten(1).hex()} cornerRadius={10}></Rect>
            <Rect x={250} y={460} width={6} height={30} fill={chroma(color).brighten(2).hex()} cornerRadius={10}></Rect>
            <Rect x={260} y={280} width={4} height={80} fill={chroma(color).brighten(0.2).hex()} cornerRadius={10}></Rect>
            <Rect x={260} y={400} width={6} height={30} fill={chroma(color).brighten(2).hex()} cornerRadius={10}></Rect>
            <Rect x={270} y={50} width={6} height={20} fill={chroma(color).brighten(0.9).hex()} cornerRadius={10}></Rect>
            <Rect x={285} y={180} width={4} height={70} fill={chroma(color).brighten(0).hex()} cornerRadius={10}></Rect>
        </>
    )
}


class Stripe4CoverComponent extends React.Component {
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
                            <Title text={this.props.title} color={this.props.color} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} color={subTitleColor} fontSize={this.props.subTitleFontSize} />
                            <ColoredLines color={this.props.color} />
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
const Stripe4Cover = connect(mapStateToProps, mapDispatchToProps)(Stripe4CoverComponent);
export default Stripe4Cover