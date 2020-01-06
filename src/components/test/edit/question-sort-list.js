import React from 'react';
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Drawer, Icon, Collapse } from 'antd';
import { convertToJSX } from 'utils/html-converter'
import { setQuestion, clearQuestion } from 'modules/test/edit/question'
import { updateQuestions, removeQuestion } from 'modules/test/edit/questions'
import AddQuestionForm from 'components/test/edit/add-question-form'
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
    marginBottom: 10,
    border: 0,
    overflow: 'hidden',
};

class QuestionListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = { visible: false }
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedQuestions = reorder(
            this.props.questions,
            result.source.index,
            result.destination.index
        );

        this.props.updateQuestions(reorderedQuestions)
    }

    updateQuestion = (question, idx) => {
        this.props.setQuestion(question, idx);
        this.setState({
            visible: true,
        });
    }

    onClose = () => {
        this.props.clearQuestion();
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable-explanation">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.questions.map((question, index) => {
                                    const QuestionBlocks = () => {
                                        const { text } = convertToJSX(question.questionBlocks);
                                        return text;
                                    }

                                    return (
                                        <Draggable key={"question-drag-key-" + index} draggableId={"question-sort-list-" + index} index={index}>
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
                                                    <div>
                                                        <Collapse
                                                            bordered={false}
                                                            defaultActiveKey={[]}
                                                            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                                                        >
                                                            <Panel
                                                                key="1"
                                                                header={"問題" + (index + 1)}
                                                                style={customPanelStyle}
                                                                extra={
                                                                    <Icons
                                                                        icons={[
                                                                            <Icon type="edit" key="question-edit" onClick={() => this.updateQuestion(question, index)} />,
                                                                            <Icon type="delete" key="question-delete" onClick={() => { this.props.removeQuestion(index) }} />,
                                                                        ]}
                                                                    />
                                                                }
                                                            >
                                                                <Drawer
                                                                    height="90%"
                                                                    closable={false}
                                                                    onClose={this.onClose}
                                                                    visible={this.state.visible}
                                                                    placement="top"
                                                                >
                                                                    {this.state.visible && <AddQuestionForm onClose={this.onClose} />}
                                                                </Drawer>
                                                                <QuestionBlocks />
                                                            </Panel>
                                                        </Collapse>
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
    questions: state.testEditQuestions.questions,
})

const mapDispatchToProps = dispatch => ({
    setQuestion: (question, idx) => dispatch(setQuestion(question, idx)),
    clearQuestion: () => dispatch(clearQuestion()),
    updateQuestions: (questions) => dispatch(updateQuestions(questions)),
    removeQuestion: (idx) => dispatch(removeQuestion(idx)),
})

const QuestionList = connect(mapStateToProps, mapDispatchToProps)(QuestionListComponent)
export default QuestionList;