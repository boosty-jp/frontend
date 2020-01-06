import React from 'react';
import { connect } from 'react-redux'
import { Drawer, Button, Icon, message } from 'antd';
import AddQuestionForm from 'components/test/edit/add-question-form'
import { clearQuestion } from 'modules/test/edit/question'

class DrawerForm extends React.Component {
    state = { visible: false };

    showDrawer = () => {
        if (!this.props.referenceCourseId) {
            message.error("出題対象のコースを選択してください");
            return;
        }

        if (!this.props.questions.length >= 20) {
            message.error("作成できる問題数は20までです。");
            return;
        }

        this.props.clearQuestion();
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.props.clearQuestion();
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button
                    type="primary"
                    onClick={this.showDrawer}
                    style={{ width: '100%' }}
                >
                    <Icon type="plus" style={{ marginRight: '8px' }} />追加する
                </Button>
                <Drawer
                    height="90%"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement="top"
                >
                    {this.state.visible && <AddQuestionForm onClose={this.onClose} />}
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    referenceCourseId: state.testEditBase.referenceCourse.id,
    questions: state.testEditQuestions.questions,
})

const mapDispatchToProps = dispatch => ({
    clearQuestion: () => dispatch(clearQuestion()),
})

const AddQuestionDrawer = connect(mapStateToProps, mapDispatchToProps)(DrawerForm)

export default AddQuestionDrawer;