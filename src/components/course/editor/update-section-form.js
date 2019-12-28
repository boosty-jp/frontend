import React from 'react';
import { connect } from 'react-redux'
import { Drawer, Button, Tooltip, Input, notification, Icon } from 'antd';
import { updateSection } from 'modules/course/edit/sections'
import { updateTitle, clearSection, setSection } from 'modules/course/edit/section'
import ContentForm from './content-form';

class SectionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        };

    }

    showDrawer = () => {
        let idx = -1;
        for (let i = 0; i < this.props.sections.length; i++) {
            if (this.props.sections[i].id === this.props.id) {
                idx = i;
                break;
            }
        }

        if (idx === -1) {
            return;
        }
        this.props.setSection(this.props.sections[idx].title, this.props.sections[idx].articles)
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
        this.props.clearSection();
    };

    updateSection = () => {
        if (!this.props.title.match(/\S/g)) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'セクション名を入力してください',
            });
            return;
        }

        if (this.props.title.length > 60) {
            notification['error']({
                message: '追加に失敗しました',
                description:
                    'セクション名は60文字以内にしてください',
            });
            return;
        }

        if (!this.props.articles.length) {
            notification['error']({
                message: '更新に失敗しました',
                description:
                    '記事を追加してください',
            });
            return;
        }

        if (this.props.sections.length > 20) {
            notification['error']({
                message: '更新に失敗しました',
                description:
                    '1つのコースに追加できるセクションは20までです',
            });
            return;
        }

        this.props.updateSection({ id: this.props.id, title: this.props.title, articles: this.props.articles })
        this.onClose();
    }

    render() {
        return (
            <>
                <Icon type="edit" onClick={this.showDrawer} />
                <Drawer
                    title="セクションを更新する"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>セクション名</p>
                    <Input value={this.props.title} size="large" placeholder="セクション名を入力してください" onChange={(e) => { this.props.updateTitle(e.target.value) }} />
                    <p style={{ fontSize: '16px', fontWeight: '500', marginTop: '40px' }}>記事一覧&nbsp;
                        <Tooltip title="10記事まで追加できます">
                            <Icon type="question-circle-o" />
                        </Tooltip></p>
                    <ContentForm />
                    <div
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>キャンセル</Button>
                        <Button onClick={this.updateSection} type="primary">更新する</Button>
                    </div>
                </Drawer>
            </>
        );
    }
}

const mapStateToProps = state => ({
    sections: state.courseEditSections.sections,
    title: state.courseEditSection.title,
    articles: state.courseEditSection.articles,
})

const mapDispatchToProps = dispatch => ({
    setSection: (title, articles) => dispatch(setSection(title, articles)),
    updateSection: (section) => dispatch(updateSection(section)),
    updateTitle: (title) => dispatch(updateTitle(title)),
    clearSection: () => dispatch(clearSection()),
})

const SectionUpdateForm = connect(mapStateToProps, mapDispatchToProps)(SectionForm)
export default SectionUpdateForm