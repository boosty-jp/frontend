import React from 'react';
import { message, Button, Modal } from 'antd'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag';
import { connect } from 'react-redux'
import { reorderPages } from 'modules/book/edit'
import { getErrorMessage } from "utils/error-handle";

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

const REORDER_PAGES = gql`
mutation reorderPages($bookId: ID!, $sectionId: ID!, $pageIds: [String]!) {
  reorderPages(bookId: $bookId, sectionId: $sectionId, pageIds: $pageIds)
}
`;

class ReorderPageModalComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = { loading: false, beforeReorderPages: [] };
    }

    handleOk = e => {
        e.preventDefault();
        e.stopPropagation();
        this.updatePages();
    };

    updatePages = async () => {
        this.setState({ loading: true });
        try {
            await this.props.client.mutate({
                mutation: REORDER_PAGES,
                variables: {
                    bookId: this.props.bookId,
                    sectionId: this.props.sectionId,
                    pageIds: this.props.pages.map(s => { return s.id })
                }
            });

            message.success("更新しました。", 7)
            this.setState({ loading: false });
            this.props.closeModal();
        } catch (err) {
            message.error(getErrorMessage(err), 7);
            this.setState({ loading: false });
        }
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedPages = reorder(
            this.props.pages,
            result.source.index,
            result.destination.index
        );

        this.props.reorderPages(this.props.sectionId, reorderedPages)
    }

    render() {
        return (
            <Modal
                title="ページの並び替え"
                visible={this.props.visible}
                onCancel={this.props.closeModal}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>キャンセル</Button>,
                    <Button key="submit" type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleOk}>更新する</Button>,
                ]}
            >
                <div style={{ padding: '20px' }} onClick={e => e.stopPropagation()}>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => {
                                return (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {this.props.pages.map((item, index) => (
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
        );
    }
}

const mapDispatchToProps = dispatch => ({
    reorderPages: (sectionId, pages) => dispatch(reorderPages(sectionId, pages)),
})

const ReorderPageModal = connect(null, mapDispatchToProps)(ReorderPageModalComponent)
export default withApollo(ReorderPageModal);