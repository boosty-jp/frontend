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
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={100}
            padding={10}
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
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={145}
            padding={18}
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
            align="right"
            fontSize={fontSize}
            width={width}
            x={0}
            y={170}
            padding={18}
            fill={color}
            lineHeight={1}
        />
    )
}

class Curve5CoverComponent extends React.Component {
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
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M-9.23705556e-14,480 C-1.13686838e-13,363.314747 58.6666667,285.564039 176,246.747874 C212.193156,234.77447 253.220913,222.469231 300,215.483155 C510.281484,184.07933 512.590238,181.994433 306.926262,209.228464 L300,214.36284 C100.551238,251.27871 -4.94523489,287.783516 -16.4894174,323.877257 C-28.0336,359.970999 -22.5371275,412.011913 -9.23705556e-14,480 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M300,215.483155 C100,246.42388 -1.13686838e-13,320.073947 -3.90798505e-13,436.433357 C-4.40536496e-13,457.740189 -58.1389097,463.084258 -47.27733,474.64222 C-23.1006077,500.369016 -7.34149769,502.154942 -4.19220214e-13,480 L89.1997487,546.224844 C224.059897,625.915111 236.221721,603.840163 125.68522,480 C15.14872,356.159837 73.2536465,267.987555 300,215.483155 Z" />
                            <Path fill={this.props.color} data="M236.912815,480 C98.8222379,346.049228 123.814829,257.876947 311.890588,215.483155 C499.966347,173.089364 496.002818,173.089364 300,215.483155 C61.5730974,262.351914 3.61652731,350.524195 126.13029,480 C248.644052,609.475805 285.571561,609.475805 236.912815,480 Z" />
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

const Curve5Cover = connect(mapStateToProps, mapDispatchToProps)(Curve5CoverComponent);
export default Curve5Cover