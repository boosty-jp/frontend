import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Row, Col, Empty, Icon, Collapse } from 'antd';
import { convertToJSX, convertToReferenceCard } from 'utils/html-converter'
import { updateExplanations, removeExplanation } from 'modules/test/edit/question'
import Icons from 'components/text/icons'

const { Panel } = Collapse;

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const customPanelStyle = {
    background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
};

class ExplanationListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedExplanations = reorder(
            this.props.explanations,
            result.source.index,
            result.destination.index
        );

        this.props.updateExplanations(reorderedExplanations)
    }

    render() {
        if (this.props.explanations.length === 0) {
            return (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="データがありません" />
            )
        }

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable-explanation">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.explanations.map((explanation, index) => {
                                    const ExplanationBlocks = () => {
                                        const { text } = convertToJSX(explanation.blocks);
                                        return text;
                                    }
                                    const ReferenceBlocks = () => {
                                        return explanation.references.map(r => { return convertToReferenceCard(r, 'reference-block-' + r.id) });
                                    }
                                    return (
                                        <Draggable key={"explanation-drag-key-" + index} draggableId={"explanation-sort-list-" + index} index={index}>
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
                                                            background: 'white'
                                                        }}
                                                    >
                                                        <Row gutter={[8, 8]} type="flex" justify="space-around" align="middle">
                                                            <Col span={21} style={{ textAlign: 'left' }}>
                                                                <p style={{ marginBottom: '0px', fontWeight: '500', fontSize: '16px' }}>解説{index + 1}</p>
                                                            </Col>
                                                            <Col span={3} style={{ textAlign: 'right' }}>
                                                                <Icon type="delete" onClick={() => this.props.removeExplanation(index)} />
                                                            </Col>
                                                        </Row>
                                                        <div style={{ lineHeight: '1.5' }}>
                                                            <ExplanationBlocks />
                                                            <Collapse
                                                                bordered={false}
                                                                defaultActiveKey={[]}
                                                                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                            >
                                                                <Panel header="参考情報" key="1" style={customPanelStyle}>
                                                                    <ReferenceBlocks />
                                                                </Panel>
                                                            </Collapse>
                                                        </div>
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
        );
    }
}

const mapStateToProps = state => ({
    explanations: state.testEditQuestion.explanations,
})

const mapDispatchToProps = dispatch => ({
    updateExplanations: (explanations) => dispatch(updateExplanations(explanations)),
    removeExplanation: (idx) => dispatch(removeExplanation(idx)),
})

const ExplanationList = connect(mapStateToProps, mapDispatchToProps)(ExplanationListComponent)
export default ExplanationList;