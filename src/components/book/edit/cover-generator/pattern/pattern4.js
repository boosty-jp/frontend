import React from "react"
import { connect } from 'react-redux'
import { Stage, Layer, Text, Rect } from 'react-konva';
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

let randNums = [];
[...Array(Math.ceil(50))].map((e, x) => {
    [...Array(Math.ceil(80))].map((e, y) => {
        randNums.push(Math.random() * 100);
    })
})

const Suqares = ({ color }) => {
    return (
        [...Array(Math.ceil(50))].map((e, x) => {
            return (
                [...Array(Math.ceil(80))].map((e, y) => {
                    const rand = randNums[80 * x + y];
                    if (rand < 85) {
                        if (rand < 50) {
                            return (
                                <Rect x={x * 30 + 6} y={y * 30 + 6} width={6} height={6} fill="#f0f0f0"></Rect>
                            );
                        } else if (rand < 70) {
                            return (
                                <Rect x={x * 30 + 6} y={y * 30 + 6} width={6} height={6} fill="#fafafa"></Rect>
                            );
                        } else {
                            return (
                                <Rect x={x * 30 + 6} y={y * 30 + 6} width={6} height={6} fill={color}></Rect>
                            );
                        }
                    }
                    return <></>;
                })
            );
        })
    )
}

class Pattern4CoverComponent extends React.Component {
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
                            <Suqares color={this.props.color} />
                            <Rect x={60} y={100} width={240} height={140} fill={subTitleColor}></Rect>
                            <Title text={this.props.title} color={backgroundColor} fontSize={this.props.titleFontSize} />
                            <SubTitle text={this.props.subTitle} color={backgroundColor} fontSize={this.props.subTitleFontSize} />
                            <Author text={this.props.author} color={backgroundColor} fontSize={this.props.authorFontSize} />
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

const Pattern4Cover = connect(mapStateToProps, mapDispatchToProps)(Pattern4CoverComponent);
export default Pattern4Cover