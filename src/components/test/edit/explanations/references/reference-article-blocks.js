import React from "react"
import { Row, Col, Button, message } from 'antd';
import { connect } from 'react-redux'
import { addReference, removeReference } from 'modules/test/edit/explanation'
import { convertToReferenceJSX } from 'utils/html-converter'

const ArticleBlocks = (props) => {
    var jsxList = [];

    const addBlock = (block, idx) => {
        if (alreadyExitsts(block)) {
            message.error("すでにこのブロックは追加されています。")
            return;
        }

        if (props.references.length >= 5) {
            message.error("選択できるブロックの数は最大5つまでです。")
            return;
        }

        props.addReference({ ...block, idx: idx, articleId: props.articleId, articleTitle: props.articleTitle });
    }

    const removeBlock = (block) => {
        props.removeReference(block.id);
    }

    const alreadyExitsts = (block) => {
        let exist = false;
        for (let i = 0; i < props.references.length; ++i) {
            if (props.references[i].id === block.id) {
                exist = true;
                break;
            }
        }
        return exist;
    }

    props.blocks.forEach((block, idx) => {
        const Block = () => convertToReferenceJSX(block);

        jsxList.push(
            <Row
                type="flex"
                justify="space-around"
                align="middle"
                className="reference-article-block"
            >
                <Col span={2}>
                    {alreadyExitsts(block) ?
                        <Button
                            type="primary"
                            shape="circle"
                            icon="close"
                            size="small"
                            style={{ marginBottom: '15px' }}
                            onClick={() => removeBlock(block)}
                        />
                        :
                        <Button
                            ghost
                            type="primary"
                            shape="circle"
                            icon="plus"
                            size="small"
                            style={{ marginBottom: '15px' }}
                            onClick={() => addBlock(block, idx + 1)}
                        />
                    }
                </Col>
                <Col span={22}>
                    <Block />
                </Col>
            </Row>
        )
    })
    return jsxList;
}

const mapStateToProps = state => ({
    references: state.testEditExplanation.references,
    articleId: state.referenceArticle.id,
    articleTitle: state.referenceArticle.title,
})

const mapDispatchToProps = dispatch => ({
    removeReference: (id) => dispatch(removeReference(id)),
    addReference: (block) => dispatch(addReference(block)),
})

const ReferenceArticleBlocks = connect(mapStateToProps, mapDispatchToProps)(ArticleBlocks)
export default ReferenceArticleBlocks;