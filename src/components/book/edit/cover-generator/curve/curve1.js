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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={170}
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
            align="center"
            fontSize={fontSize}
            width={width}
            x={0}
            y={220}
            padding={10}
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
            y={440}
            padding={10}
            fill={color}
            lineHeight={1}
        />
    )
}

class Curve1CoverComponent extends React.Component {
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
                            <Path fill={this.props.color} data="M-4,325.411315 C-34.6666667,336.417829 -34.6666667,388.005121 -4,480.173189 L181.1847,480.411315 C154.168282,462.894507 123.304165,452.209177 88.5923502,448.355325 C36.5246276,442.574548 42,308.901543 -4,325.411315 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M-17,346.411315 C-47.6666667,357.417829 -47.6666667,409.005121 -17,501.173189 L168.1847,501.411315 C141.168282,483.894507 110.304165,473.209177 75.5923502,469.355325 C23.5246276,463.574548 29,329.901543 -17,346.411315 Z" />
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M-35,360.411315 C-65.6666667,371.417829 -65.6666667,423.005121 -35,515.173189 L150.1847,515.411315 C123.168282,497.894507 92.3041653,487.209177 57.5923502,483.355325 C5.52462755,477.574548 11,343.901543 -35,360.411315 Z" />
                            <Path fill={this.props.color} data="M314.098762,-7.10542736e-15 L314.098762,113.143166 C299.817018,124.176464 282.203533,117.391084 261.258308,92.7870252 C229.84047,55.8809373 230.061543,51.1734945 196.780562,59.1335084 C163.499581,67.0935224 153.37129,47.961736 146.024324,38.2262235 C138.677358,28.490711 133.170153,14.1030685 106.363604,23.9664664 C88.492572,30.542065 75.7047039,22.5532429 68,-7.10542736e-15 L314.098762,-7.10542736e-15 Z" />
                            <Path fill={chroma(this.props.color).brighten(1).hex()} data="M323.098762,-14 L323.098762,99.1431661 C308.817018,110.176464 291.203533,103.391084 270.258308,78.7870252 C238.84047,41.8809373 239.061543,37.1734945 205.780562,45.1335084 C172.499581,53.0935224 162.37129,33.961736 155.024324,24.2262235 C147.677358,14.490711 142.170153,0.103068466 115.363604,9.96646637 C97.492572,16.542065 84.7047039,8.55324285 77,-14 L323.098762,-14 Z" />
                            <Path fill={chroma(this.props.color).brighten(3).hex()} data="M334.098762,-30 L334.098762,83.1431661 C319.817018,94.1764641 302.203533,87.3910838 281.258308,62.7870252 C249.84047,25.8809373 250.061543,21.1734945 216.780562,29.1335084 C183.499581,37.0935224 173.37129,17.961736 166.024324,8.22622354 C158.677358,-1.50928896 153.170153,-15.8969315 126.363604,-6.03353363 C108.492572,0.542064975 95.7047039,-7.44675715 88,-30 L334.098762,-30 Z" />
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
const Curve1Cover = connect(mapStateToProps, mapDispatchToProps)(Curve1CoverComponent);
export default Curve1Cover