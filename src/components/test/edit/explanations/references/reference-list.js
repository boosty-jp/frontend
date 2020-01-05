import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon, Row, Col, Empty, Divider } from 'antd'
import { convertToReferenceJSX } from 'utils/html-converter'
import { updateReferences, removeReference } from 'modules/test/edit/explanation'
import { createArticleLink } from 'utils/link-generator';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

class SortList extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedReferences = reorder(
            this.props.references,
            result.source.index,
            result.destination.index
        );

        this.props.updateReferences(reorderedReferences)
    }

    render() {
        if (this.props.references.length === 0) {
            return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="参考情報がありません" />
            )
        }
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable-reference">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.references.map((reference, index) => {
                                    console.log(reference);
                                    const ReferenceBlock = () => convertToReferenceJSX(reference);
                                    return (
                                        <Draggable key={reference.id} draggableId={reference.id} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        userSelect: "none",
                                                        padding: 2,
                                                        margin: `0 0 8px 0`,
                                                        ...provided.draggableProps.style
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            padding: '10px 16px',
                                                            borderRadius: '0.25rem',
                                                            border: '1px solid #d9d9d9',
                                                            // color: snapshot.isDragging ? 'red' : 'blue',
                                                            backgroundColor: 'white'
                                                        }}
                                                    >
                                                        <Row gutter={[8, 8]} >
                                                            <Col span={21} style={{ textAlign: 'left', lineHeight: '1.5' }}>
                                                                <ReferenceBlock />
                                                            </Col>
                                                            <Col span={3} style={{ textAlign: 'right' }}>
                                                                <Icon type="delete" onClick={() => this.props.removeReference(reference.id)} />
                                                            </Col>
                                                        </Row>
                                                        <Divider style={{ margin: '0px' }} />
                                                        <span style={{ fontSize: '12px' }}>
                                                            「<a href={createArticleLink(reference.articleId)} target="_blank">{reference.articleTitle}</a>」の第{reference.idx}ブロックより
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapStateToProps = state => ({
    references: state.testEditExplanation.references,
})

const mapDispatchToProps = dispatch => ({
    updateReferences: (references) => dispatch(updateReferences(references)),
    removeReference: (id) => dispatch(removeReference(id)),
})

const ReferenceList = connect(mapStateToProps, mapDispatchToProps)(SortList)
export default ReferenceList