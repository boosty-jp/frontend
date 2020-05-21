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
            y={120}
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
            y={165}
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
            y={190}
            padding={18}
            fill={color}
            lineHeight={1}
        />
    )
}

class Curve4CoverComponent extends React.Component {
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
                            <Path fill={this.props.color} data="M329.921852,242.000033 C193.799516,418.950325 74.7474777,444.503858 -27.234263,318.66063 C-127.138918,195.38048 -184.852986,331.985804 -54.2607412,441.270615 C-51.6899844,443.421927 150.353213,527.007635 300,288.276091 C308.402495,274.87159 317.074204,255.475067 325.098832,240 C420.234276,56.5363531 424.981046,45.6415006 340.23072,203.315377 C336.968864,209.383902 333.532575,222.278787 329.921852,242.000033 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M325.185888,256.93643 C168.906867,448.739161 39.7764858,481.718913 -62.2052548,355.875685 C-162.109909,232.595535 -192.7975,335.473771 -62.2052548,444.758582 C-59.4901529,447.030688 135.061938,547.095014 325.185888,262.390178 C435.946682,96.5292545 340.763565,100.365113 340.763565,227.922575 C340.763565,234.331326 335.571006,244.002611 325.185888,256.93643 Z" />
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M321.407716,262.163214 C169.300391,458.076624 42.2558582,493.111715 -59.7258824,367.268487 C-159.630537,243.988338 -181.840769,367.985804 -51.2485236,477.270615 C-48.5334218,479.542721 170.466047,557.088033 321.407716,266.005049 C416.54316,82.5414023 427.993263,81.6415006 343.242938,239.315377 C339.981082,245.383902 332.702675,252.999848 321.407716,262.163214 Z" />
                            <Path fill={this.props.color} data="M300,68.9065451 C161.702958,21.7249804 61.7029579,25.9709896 1.42108547e-14,81.6445728 C-92.5544368,165.154948 -92.4056928,64.9190027 1.27897692e-13,34.4831261 C92.4056928,4.04724962 218.16137,31.6748189 300,61.9915309 C354.559086,82.2026723 354.559086,84.507677 300,68.9065451 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M299.552091,63.4711484 C118.172067,10.0509887 1.66940831,11.8613748 -49.9558837,68.9023069 C-127.393822,154.463705 -74.2840631,22.1164021 -0.447909108,11.2625244 C73.3882449,0.408646718 168.104182,23.5294001 299.552091,58.4562183 C387.18403,81.7407638 387.18403,83.4124072 299.552091,63.4711484 Z" />
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M300,58.7331599 C118.398649,6.71660926 -7.30603002,-3.3884111 -77.1140384,28.4180989 C-181.826051,76.1278638 -130,-11.2335738 -16.0856194,-11.2335738 C97.8287612,-11.2335738 254,38.4037316 300,53.0544484 C330.666667,62.8215929 330.666667,64.7144968 300,58.7331599 Z" />
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

const Curve4Cover = connect(mapStateToProps, mapDispatchToProps)(Curve4CoverComponent);
export default Curve4Cover