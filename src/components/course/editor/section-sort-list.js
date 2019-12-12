import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon, Row, Col } from 'antd'
import Icons from 'components/text/icons';
import { deleteSection, updateSections } from 'modules/course/edit/sections'
import SectionUpdateForm from 'components/course/editor/update-section-form';

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

        const reorderedSections = reorder(
            this.props.sections,
            result.source.index,
            result.destination.index
        );

        this.props.updateSections(reorderedSections)
    }
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => {
                        return (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {this.props.sections.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
                                                        padding: '12px 16px',
                                                        borderRadius: '0.25rem',
                                                        border: '1px solid #d9d9d9',
                                                        // color: snapshot.isDragging ? 'red' : 'blue',
                                                        backgroundColor: '#fafafa'
                                                    }}
                                                >
                                                    <Row gutter={[8, 8]} style={{ verticalAlign: 'middle' }}>
                                                        <Col span={18} style={{ textAlign: 'left' }}>
                                                            {index + 1}. {item.title}
                                                        </Col>
                                                        <Col span={6} style={{ textAlign: 'right' }}>
                                                            <Icons icons={[
                                                                <SectionUpdateForm section={item} />,
                                                                <Icon type="delete" onClick={() => this.props.deleteSection(item.id)} />
                                                            ]} />
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateSections: (sections) => dispatch(updateSections(sections)),
    deleteSection: (id) => dispatch(deleteSection(id)),
})

const SectionSortList = connect(null, mapDispatchToProps)(SortList)
export default SectionSortList