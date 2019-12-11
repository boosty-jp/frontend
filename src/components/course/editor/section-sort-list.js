import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Icon, Row, Col } from 'antd'
import Icons from 'components/text/icons';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export default class SectionSortList extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const elements = reorder(
            this.props.sections,
            result.source.index,
            result.destination.index
        );
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
                                                                <Icon type="edit" />,
                                                                <Icon type="delete" />
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