import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect, Path } from 'react-konva';
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
            align="left"
            fontSize={fontSize}
            width={width}
            x={0}
            y={40}
            padding={20}
            fill={color}
            lineHeight={1}
            fontStyle="bold"
        />
    )
}

const SubTitle = ({ text, color, fontSize }) => {
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
            fill={color}
            lineHeight={1}
        />
    )
}


const Author = ({ text, color, fontSize }) => {
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
            fill={color}
            lineHeight={1}
        />
    )
}

class Curve3CoverComponent extends React.Component {
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
                            <Path fill={this.props.color} data="M2.84217094e-14,220.115731 C-98.6666667,183.5385 -98.6666667,270.16659 2.84217094e-14,480 L300,480 L310.091935,179.298014 C202.030645,243.087057 98.6666667,256.692962 2.84217094e-14,220.115731 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M-20.3534121,198.646752 C58.7454919,243.320181 168.893941,236.870602 310.091935,179.298014 C451.289928,121.725426 447.92595,123.922598 300,185.889528 C192.547726,254.972881 84.9393927,268.764704 -22.8249992,227.264999 C-130.589391,185.765293 -129.765529,176.225877 -20.3534121,198.646752 Z" />
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M331.503428,118 C200.303756,203.508328 89.8026135,233.61523 0,208.320707 C-89.8026135,183.026183 -89.8026135,184.1777 7.10542736e-14,211.775257 C84.8684125,244.508242 184.868413,235.539016 300,184.867576 C415.131587,134.196137 425.63273,111.906945 331.503428,118 Z" />
                            <Title text={this.props.title} color={subTitleColor} fontSize={this.props.titleFontSize} />
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
    mode: state.bookGenerator.mode,
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
})

const Curve3Cover = connect(mapStateToProps, mapDispatchToProps)(Curve3CoverComponent);
export default Curve3Cover