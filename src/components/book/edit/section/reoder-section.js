import React from 'react';
import { message, Button, Modal } from 'antd'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { reorderSections } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";
import { RetweetOutlined } from '@ant-design/icons';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const dragItemStyle = {
    padding: '12px 16px',
    borderRadius: '0.25rem',
    border: '1px solid',
}

const dragBoardStyle = {
    userSelect: "none",
    padding: 2,
    margin: `0 0 8px 0`,
}

const REORDER_SECTIONS = gql`
mutation reorderSections($bookId: ID!, $sectionIds: [String]!) {
  reorderSections(bookId: $bookId, sectionIds: $sectionIds)
}
`;

class ReorderSectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = { visible: false, loading: false, beforeReorderSections: [] };
    }


    showModal = () => {
        if (!this.props.sections || this.props.sections.length === 0) {
            message.error("セクションがありません。", 7)
            return;
        }

        this.setState({
            visible: true,
            beforeReorderSections: this.props.sections
        });
    };

    handleOk = e => {
        e.preventDefault();
        this.updateSections();
    };

    updateSections = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: REORDER_SECTIONS,
                variables: {
                    bookId: this.props.id,
                    sectionIds: this.props.sections.map(s => { return s.id })
                }
            });

            message.success("更新しました。", 7)
            this.setState({ visible: false, loading: false });
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        this.props.reorderSections(this.state.beforeReorderSections);
    };

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

        this.props.reorderSections(reorderedSections)
    }

    render() {
        return (
            <>
                <Button onClick={this.showModal}><RetweetOutlined rotate={90} />並び替え</Button>
                <Modal
                    title="セクションの並び替え"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>キャンセル</Button>,
                        <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>更新する</Button>,
                    ]}
                >
                    <div style={{ padding: '20px' }}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => {
                                    return (
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                            {this.props.sections.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...dragBoardStyle, ...provided.draggableProps.style }}
                                                        >
                                                            <div style={{
                                                                ...dragItemStyle,
                                                                borderColor: snapshot.isDragging ? "#1890ff" : "#bfbfbf",
                                                                color: snapshot.isDragging ? '#1890ff' : '#595959',
                                                                backgroundColor: snapshot.isDragging ? '#e6f7ff' : '#fafafa',
                                                            }}>
                                                                <div>
                                                                    {index + 1 + ". " + item.title}
                                                                </div>
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
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    sections: state.bookEdit.sections,
})

const mapDispatchToProps = dispatch => ({
    reorderSections: (id, title) => dispatch(reorderSections(id, title)),
})

const ReorderSection = connect(mapStateToProps, mapDispatchToProps)(ReorderSectionComponent)
export default withApollo(ReorderSection);