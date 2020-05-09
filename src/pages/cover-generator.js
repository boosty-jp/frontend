import React from "react"
import { connect } from 'react-redux'
import SEO from "components/seo/seo"
import VerticalLayout from "components/layout/vertical"
import { message, Input, Row, Col, InputNumber } from 'antd';
import { isLoggedIn } from "services/local-user"
import { updateTitle, updateAuthor, updateSubTitle, randomChangeCover, updateTitleFontSize, updateSubTitleFontSize, updateAuthorFontSize } from "modules/book/edit/generator"
import TemplateSelector from "components/book/edit/cover-generator/template-selector";
import ColorSelector from "components/book/edit/cover-generator/color-selector";
import CoverPreview from "components/book/edit/cover-generator/preview";
import ModeSelector from "components/book/edit/cover-generator/mode-selector";

const isBrowser = typeof window !== 'undefined';
const navigate = isBrowser ? require('gatsby').navigate : () => { }

const boardStyle = {
    backgroundColor: 'white',
    boxShadow: '0 4px 11px 0 rgba(37,44,97,.15), 0 1px 3px 0 rgba(93,100,148,.2)',
    borderRadius: '1rem',
    width: '100%',
    padding: '20px',
    fontColor: 'black',
}

class CoverGeneratePageComponent extends React.Component {
    render() {
        if (!isLoggedIn) {
            message.error("ご利用には、ログインが必要です");
            navigate("/home");
        }
        return (
            <VerticalLayout>
                <SEO title="Home" />
                <div style={{ backgroundColor: '#F7FAFF' }}>
                    <div style={{ padding: '80px 20px', margin: '0 auto', maxWidth: '1000px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', ...boardStyle }}>
                            <div>
                                <div style={{ width: '300px' }}>
                                    <CoverPreview />
                                </div>
                            </div>
                            <div style={{ paddingLeft: '20px' }}>
                                <p style={{ fontSize: '28px', color: 'black', textAlign: 'left' }}>カバー画像作成ツール</p>
                                <p style={{ marginTop: '12px' }}>※ 文字はドラッグ&ドロップで動かせます</p>
                                <TemplateSelector />
                                <ColorSelector />
                                <ModeSelector />
                                <Row gutter={10}>
                                    <Col span={16}>
                                        <Input
                                            placeholder="タイトル"
                                            style={{ marginBottom: '10px' }}
                                            onChange={e => this.props.updateTitle(e.target.value)}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            min={12}
                                            max={60}
                                            value={this.props.titleFontSize}
                                            formatter={value => `${value.toString(10).replace(/[^0-9]/g, "")}px`}
                                            onChange={value => this.props.updateTitleFontSize(value)}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <Input
                                            placeholder="サブタイトル"
                                            style={{ marginBottom: '10px' }}
                                            onChange={e => this.props.updateSubTitle(e.target.value)}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            min={12}
                                            max={60}
                                            value={this.props.subTitleFontSize}
                                            formatter={value => `${value.toString(10).replace(/[^0-9]/g, "")}px`}
                                            onChange={value => this.props.updateSubTitleFontSize(value)}
                                        />
                                    </Col>
                                    <Col span={16}>
                                        <Input
                                            placeholder="著者名"
                                            onChange={e => this.props.updateAuthor(e.target.value)}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            min={12}
                                            max={60}
                                            value={this.props.authorFontSize}
                                            formatter={value => `${value.toString(10).replace(/[^0-9]/g, "")}px`}
                                            onChange={value => this.props.updateAuthorFontSize(value)}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </VerticalLayout>
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
    image: state.bookGenerator.image,
})

const mapDispatchToProps = dispatch => ({
    randomChangeCover: () => dispatch(randomChangeCover()),
    updateTitle: (title) => dispatch(updateTitle(title)),
    updateSubTitle: (subTitle) => dispatch(updateSubTitle(subTitle)),
    updateAuthor: (author) => dispatch(updateAuthor(author)),
    updateTitleFontSize: (titleFontSize) => dispatch(updateTitleFontSize(titleFontSize)),
    updateSubTitleFontSize: (subTitleFontSize) => dispatch(updateSubTitleFontSize(subTitleFontSize)),
    updateAuthorFontSize: (authorFontSize) => dispatch(updateAuthorFontSize(authorFontSize)),
})

const CoverGeneratePage = connect(mapStateToProps, mapDispatchToProps)(CoverGeneratePageComponent);
export default CoverGeneratePage