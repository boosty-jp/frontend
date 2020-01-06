import React from 'react';
import { connect } from 'react-redux'
import { Drawer, Button, Icon, message } from 'antd';
import AddQuestionForm from 'components/test/edit/add-question-form'

class DrawerForm extends React.Component {
    state = { visible: true };

    showDrawer = () => {
        if (!this.props.referenceCourseId) {
            message.error("出題対象のコースを選択してください");
            return;
        }

        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showDrawer} style={{ width: '100%' }}><Icon type="plus" style={{ marginRight: '8px' }} />追加する</Button>
                <Drawer
                    height="90%"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="top"
                >
                    <AddQuestionForm onClose={this.onClose} />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    referenceCourseId: state.testEditBase.referenceCourse.id,
})
const AddQuestionDrawer = connect(mapStateToProps)(DrawerForm)

export default AddQuestionDrawer;